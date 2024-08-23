"use client";
import {
  Paper,
  SortDirection,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import { error } from "console";
import type { Post, Prisma } from "prisma/prisma-client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

type PostsWithIncludes = Prisma.PostGetPayload<{
  include: { author: true; categories: true; tags: true };
}>;

export default function PostsTable() {
  const [posts, setPosts] = useState<PostsWithIncludes[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<SortDirection>("asc");

  useEffect(() => {
    async function fetchPosts() {
      axios
        .get(
          `/api/posts?page=${
            page + 1
          }&pageSize=${rowsPerPage}&dateOrder=${order}`
        )
        .then((res) => {
          setPosts(res.data.posts);
          setTotalPosts(res.data.totalPosts);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchPosts();
  }, [page, rowsPerPage, order]);

  function handleChangePage(event: any, newPage: number) {
    setPage(newPage);
  }

  function handleDateSort(event: any) {
    setOrder((prev) => {
      return prev === "asc" ? "desc" : "asc";
    });
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={1} variant="outlined">
      <TableContainer>
        <Table className="min-w-[500px] mb-2">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold text-center">Title</TableCell>
              <TableCell className="font-bold">Author</TableCell>
              <TableCell className="font-bold" sortDirection={order}>
                <TableSortLabel
                  active={true}
                  direction={order === "asc" ? "asc" : "desc"}
                  onClick={handleDateSort}
                >
                  Date Created
                </TableSortLabel>
              </TableCell>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => {
              return (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.author.name}</TableCell>
                  <TableCell>
                    {dayjs(post.createdAt).format("MMM D, YYYY").toString()}
                  </TableCell>
                  <TableCell>
                    {post.published ? "Published" : "Pending"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={totalPosts}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

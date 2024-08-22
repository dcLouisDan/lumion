"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { error } from "console";
import type { Post, Prisma } from "prisma/prisma-client";
import React, { useEffect, useState } from "react";

type PostsWithIncludes = Prisma.PostGetPayload<{
  include: { author: true; categories: true; tags: true };
}>;

export default function CustomTable() {
  const [posts, setPosts] = useState<PostsWithIncludes[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchPosts() {
      axios
        .get(`/api/posts?page=${page}&pageSize=${rowsPerPage}`)
        .then((res) => {
          setPosts(res.data.posts);
          setTotalPosts(res.data.totalPosts);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchPosts();
  }, [page, rowsPerPage]);

  return (
    <Paper elevation={1} variant="outlined">
      <TableContainer>
        <Table className="min-w-[500px] mb-2">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => {
              return (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.author.name}</TableCell>
                  <TableCell>{post.createdAt.toString()}</TableCell>
                  <TableCell>
                    {post.published ? "Published" : "Pending"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

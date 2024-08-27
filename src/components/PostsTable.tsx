"use client";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Snackbar,
  SortDirection,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import type { Post, Prisma } from "prisma/prisma-client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { EditSharp, StopCircle, Upcoming, Upload } from "@mui/icons-material";
import Link from "next/link";
import { User } from "next-auth";
import { updatePostPublishedState } from "@/actions/post-actions";

const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

type PostsWithIncludes = Prisma.PostGetPayload<{
  include: { author: true; categories: true; tags: true };
}>;

export default function PostsTable({ user }: { user?: User | null }) {
  const [openModal, setOpenModal] = useState(false);
  const [targetPost, setTargetPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostsWithIncludes[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<SortDirection>("desc");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

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
          setIsLoading(false);
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

  async function handlePublishActionClick(id: number, publishedState: boolean) {
    try {
      const res = await updatePostPublishedState(id, publishedState);

      if (!res?.success) {
        setSnackMessage(res?.error as string);
      } else {
        const snackMessage = publishedState
          ? `Post No. ${id} has been published.`
          : `Post No. ${id} has been unpublished.`;
        setSnackMessage(snackMessage);

        setPosts((prevData) =>
          prevData.map((post) =>
            post.id === id ? { ...post, published: publishedState } : post
          )
        );
        setOpenModal(false);
      }
    } catch (error) {
      setSnackMessage("Failed to update the post status.");
    } finally {
      setSnackOpen(true);
    }
  }

  function handleClose() {
    setSnackOpen(false);
  }

  function handleModalClose() {
    setOpenModal(false);
  }
  return (
    <Paper elevation={1} variant="outlined">
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg max-w-96"
        >
          <Typography id="modal-modal-title" variant="h6">
            {targetPost?.published ? "Unpublish" : "Publish"}{" "}
            <span className="font-bold">"{targetPost?.title}"</span> ???
          </Typography>
          <p className="py-4">
            {targetPost?.published
              ? "Are you sure you want to unpublish this post? Once unpublished, it will no longer be visible to everyone on the website."
              : "Are you sure you want to publish this post? Once published, it will be visible to everyone on the website."}
          </p>
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleModalClose}
              variant="outlined"
              color="secondary"
              disableElevation
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              onClick={() => {
                if (!targetPost?.id) return;

                handlePublishActionClick(
                  targetPost?.id,
                  !targetPost?.published
                );
              }}
            >
              {!targetPost?.published ? "Publish Post" : "Unpublish Post"}
            </Button>
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        message={snackMessage}
      />
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
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-center items-center gap-8">
                    Loading Data...
                    <CircularProgress />
                  </div>
                </TableCell>
              </TableRow>
            )}
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
                    {post.published ? (
                      <span className="text-green-700">Published</span>
                    ) : (
                      "Pending"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/posts/${post.id}`}
                        className={
                          Number(user?.id) !== post.authorId
                            ? "pointer-events-none"
                            : "pointer-events-auto"
                        }
                      >
                        <IconButton
                          color="primary"
                          size="small"
                          aria-label="edit post"
                          disabled={Number(user?.id) !== post.authorId}
                        >
                          <EditSharp fontSize="inherit" />
                        </IconButton>
                      </Link>
                      <IconButton
                        color="primary"
                        size="small"
                        aria-label="edit post"
                        disabled={Number(user?.id) !== post.authorId}
                        onClick={() => {
                          // handlePublishActionClick(post.id, !post.published)
                          setTargetPost(post);
                          setOpenModal(true);
                        }}
                      >
                        {post.published ? (
                          <StopCircle
                            fontSize="inherit"
                            className="hover:text-red-700 transition-all ease-in-out duration-300"
                          />
                        ) : (
                          <Upload
                            fontSize="inherit"
                            className="hover:text-green-700 transition-all ease-in-out duration-300"
                          />
                        )}
                      </IconButton>
                    </div>
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

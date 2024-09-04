"use client";
import { CommentExtend } from "@/lib/types/modelTypesExtended";
import { Favorite } from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  Link,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import { comment } from "postcss";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function PostInteractionsPanels({
  isSignedIn,
  userId,
  postId,
  likesTotal,
  comments,
  isLikedStatus,
}: {
  isSignedIn: boolean;
  userId: number | undefined;
  postId: number | undefined;
  likesTotal: number | undefined;
  comments: CommentExtend[] | undefined;
  isLikedStatus: boolean | undefined;
}) {
  const [isLiked, setIsLiked] = useState(isLikedStatus);
  const [totalLikes, setTotalLikes] = useState(likesTotal ?? 0);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [postComments, setPostComments] = useState(comments ?? []);
  const likeButtonColor = isLiked ? "text-rose-600" : "";

  async function likePost() {
    const formData = new FormData();
    formData.append("userId", String(userId));
    formData.append("postId", String(postId));

    try {
      const response = await axios.post("/api/likes", formData);

      if (response.data.success) {
        setIsLiked(true);
        setTotalLikes((prev) => prev + 1);
      } else {
        console.log("Error: ", response.data.error);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async function unlikePost() {
    const formData = new FormData();
    formData.append("userId", String(userId));
    formData.append("postId", String(postId));

    try {
      const response = await axios.delete("/api/likes", { data: formData });

      if (response.data.success) {
        setIsLiked(false);
        setTotalLikes((prev) => prev - 1);
      } else {
        console.log("Error: ", response.data.error);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  function Comment({ comment }: { comment: CommentExtend }) {
    return (
      <div className="flex py-3 px-4 gap-2">
        <Avatar />
        <div className="flex-1 text-sm">
          <div className="font-bold">{comment?.user.name}</div>
          <p className="text-xs text-gray-400">
            {dayjs(comment.createdAt).fromNow().toString()}
          </p>
          <div className="text-sm py-1">{comment.content}</div>
        </div>
      </div>
    );
  }

  async function handleCommentSubmit(e: FormEvent) {
    e.preventDefault();
    if (newCommentContent.trim() === "") return;
    if (!isSignedIn) return;

    const formData = new FormData();
    formData.append("userId", String(userId));
    formData.append("postId", String(postId));
    formData.append("content", newCommentContent);

    try {
      const response = await axios.post("/api/comments", formData);

      if (response.data.success) {
        const comment = response.data.comment;
        const newComment = {
          user: comment.user,
          id: comment.id,
          content: comment.content,
          postId: comment.postId,
          userId: comment.userId,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        };
        setPostComments((prev) => [newComment, ...prev]);
      } else {
        console.log("Error: ", response.data.error);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <>
      {!isSignedIn && (
        <Paper
          variant="outlined"
          className="text-sm p-4 text-center text-gray-600 flex flex-col gap-4"
        >
          <div>
            <Link
              href="/auth/login"
              className="hover:text-gray-500 transition-all ease-in-out duration-300 hover:animate-pulse"
            >
              Sign in
            </Link>{" "}
            to join the conversation and like this post.
          </div>
        </Paper>
      )}
      <Paper variant="outlined" className="flex">
        <div className="flex items-center py-2 px-2 border-e">
          <IconButton
            value="like"
            disabled={!isSignedIn}
            className={"active:animate-ping " + likeButtonColor}
            onClick={() => {
              if (isLiked) {
                unlikePost();
              } else {
                likePost();
              }
            }}
          >
            <Favorite fontSize="inherit" color="inherit" />
          </IconButton>
        </div>
        <div className="px-4 py-2 flex items-center">Likes</div>
        <div className="flex-1 flex justify-end items-center px-4 text-gray-600">
          {totalLikes}
        </div>
      </Paper>
      <Paper variant="outlined">
        <div className="p-4 border-b border-gray-300 flex items-center">
          <div>Comments</div>
          <div className="flex-1 text-end text-gray-600">
            {postComments.length}
          </div>
        </div>
        <div className="flex flex-col">
          {isSignedIn && (
            <div className="flex border-b w-full min-h-16 items-top py-2 px-2 gap-2">
              <Avatar />
              <form
                className="flex-1 flex flex-col text-sm"
                onSubmit={handleCommentSubmit}
              >
                <TextField
                  className="py-2"
                  size="small"
                  inputProps={{ className: "text-sm" }}
                  multiline
                  variant="standard"
                  placeholder="Add a comment..."
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                />
                <Button
                  className="w-16 ms-auto"
                  disableElevation
                  size="small"
                  variant="contained"
                  type="submit"
                >
                  Post
                </Button>
              </form>
            </div>
          )}
          <div className="grid grid-cols-1 divide-y">
            {comments?.length === 0 && (
              <div className="px-2 py-4 text-xs text-gray-500 text-center">
                There are no comments on this post yet.
              </div>
            )}
            {postComments?.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
          </div>
        </div>
      </Paper>
    </>
  );
}

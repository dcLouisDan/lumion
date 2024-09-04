"use client";
import { Favorite } from "@mui/icons-material";
import { IconButton, Link, Paper } from "@mui/material";
import { Comment } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";

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
  comments: Comment[] | undefined;
  isLikedStatus: boolean | undefined;
}) {
  const [isLiked, setIsLiked] = useState(isLikedStatus);
  const [totalLikes, setTotalLikes] = useState(likesTotal ?? 0);
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
        <div className="flex items-center">
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
        <div className="px-4 py-2">Likes</div>
        <div className="flex-1 flex justify-end items-center px-4 text-gray-600">
          {totalLikes}
        </div>
      </Paper>
      <Paper variant="outlined">
        <div className="p-4 border-b border-gray-300">Comments</div>
        <div className="flex flex-col">
          <div className="px-4 py-2">Comment 1</div>
        </div>
      </Paper>
    </>
  );
}

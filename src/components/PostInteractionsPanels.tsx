"use client";
import { Favorite } from "@mui/icons-material";
import { Paper, ToggleButton } from "@mui/material";
import React, { useState } from "react";

export default function PostInteractionsPanels() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <>
      <Paper variant="outlined" className="flex">
        <div className="flex items-center">
          <ToggleButton
            value="like"
            selected={isLiked}
            onChange={() => setIsLiked((prev) => !prev)}
          >
            <Favorite fontSize="inherit" />
          </ToggleButton>
        </div>
        <div className="px-4 py-2">Likes</div>
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

"use client";
import { CommentExtend } from "@/lib/types/modelTypesExtended";
import { dayjsExtended } from "@/lib/utils";
import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function PostComment({
  comment,
  onDelete,
  isOwner,
}: {
  comment: CommentExtend;
  onDelete?: (id: number) => void;
  isOwner: boolean;
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: any) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (
      prevOpen.current === true &&
      open === false &&
      anchorRef.current !== null
    ) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  async function handleCommentDelete(e: any) {
    const formData = new FormData();
    formData.append("id", String(comment.id));

    try {
      const response = await axios.delete("/api/comments", { data: formData });

      if (!response.data.success) {
        console.log("Error: ", response.data.error);
      }
      handleClose(e);
      if (!onDelete) return;
      onDelete(comment.id);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  return (
    <div className="flex py-3 px-4 gap-2 relative">
      <Avatar />
      <div className="flex-1 text-sm">
        <div className="font-bold">{comment?.user.name}</div>
        <p className="text-xs text-gray-400">
          {dayjsExtended(comment.createdAt).fromNow().toString()}
        </p>
        <div className="text-sm py-1">{comment.content}</div>
      </div>
      {isOwner && (
        <div className=" right-2">
          <IconButton
            ref={anchorRef}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleToggle}
            size="small"
          >
            <MoreVert fontSize="inherit" color="inherit" />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            className="z-30"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper variant="outlined">
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        onClick={handleCommentDelete}
                        className="text-sm"
                      >
                        Delete Comment
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      )}
    </div>
  );
}

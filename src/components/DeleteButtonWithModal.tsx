"use client";
import { deletePost } from "@/actions/post-actions";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ModalContent = "warning" | "loading" | "success" | "error";

export default function DeleteButtonWithModal({ id }: { id: number }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [modalContent, setModalContent] = useState<ModalContent>("warning");

  function handleClose() {
    setOpenModal(false);
  }

  async function onDeleteClick() {
    setModalContent("loading");
    const res = await deletePost(id);

    if (res.success) {
      setModalContent("success");
      setTimeout(() => {
        router.push("/posts");
      }, 2000);
    } else {
      setError(res.error as string);
      setModalContent("error");
      // setTimeout(() => setOpenModal(false), 1000);
    }
  }

  function WarningMessage({ modalContent }: { modalContent: ModalContent }) {
    if (modalContent !== "warning") return;

    return (
      <>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure want to delete this post?{" "}
          <span className="text-rose-700">This action cannot be undone.</span>
        </Typography>
        <div className="flex justify-end mt-4 gap-2">
          <Button
            onClick={handleClose}
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
            onClick={onDeleteClick}
          >
            Delete Post
          </Button>
        </div>
      </>
    );
  }

  function LoadingMessage({ modalContent }: { modalContent: ModalContent }) {
    if (modalContent !== "loading") return;
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Box sx={{ display: "flex", gap: 2 }}>
          Loading
          <CircularProgress />
        </Box>
      </div>
    );
  }

  function SuccessMessage({ modalContent }: { modalContent: ModalContent }) {
    if (modalContent !== "success") return;

    return (
      <Typography className="text-center mt-4">
        Post Successfully Deleted.
      </Typography>
    );
  }

  function ErrorMessage({ modalContent }: { modalContent: ModalContent }) {
    if (modalContent !== "error") return;

    return (
      <Typography className="text-center mt-4">
        Something went wrong. <br /> {error}
      </Typography>
    );
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg"
        >
          <Typography id="modal-modal-title" variant="h6">
            Delete post?
          </Typography>
          <WarningMessage modalContent={modalContent} />
          <LoadingMessage modalContent={modalContent} />
          <SuccessMessage modalContent={modalContent} />
          <ErrorMessage modalContent={modalContent} />
        </Box>
      </Modal>
      <Button
        variant="outlined"
        color="warning"
        onClick={() => setOpenModal(true)}
      >
        <Delete fontSize="inherit" />
        <span className="ms-2">Delete Post</span>
      </Button>
    </div>
  );
}

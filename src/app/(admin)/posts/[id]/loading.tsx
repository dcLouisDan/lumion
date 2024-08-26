import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Box sx={{ display: "flex", gap: 2 }}>
        Loading
        <CircularProgress />
      </Box>
    </div>
  );
}

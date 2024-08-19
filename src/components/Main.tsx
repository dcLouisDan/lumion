"use client";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React, { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#be123c",
    },
    secondary: blueGrey,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "initial",
        },
      },
    },
  },
});

export default function Main({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <main className="flex-1 flex flex-col">{children}</main>
    </ThemeProvider>
  );
}

"use client";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import React, { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: blueGrey,
  },
  typography: {
    fontFamily: ['"Shantell Sans"'].join(","),
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
      <div className="flex-1 flex flex-col px-2 sm:px-4">{children}</div>
    </ThemeProvider>
  );
}

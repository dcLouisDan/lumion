import React from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Lock, Mail } from "@mui/icons-material";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form action="" className="flex flex-col gap-2">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Email"
        color="primary"
        type="email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Password"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <Link
        href="/reset-password"
        className="font-extrabold text-end text-rose-700 hover:text-rose-600 active:text-rose-400"
      >
        Forgot Password
      </Link>
      <Button
        variant="contained"
        disableElevation
        type="submit"
        className="mt-4"
      >
        Login
      </Button>
    </form>
  );
}

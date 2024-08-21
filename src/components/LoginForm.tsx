"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Lock, Mail } from "@mui/icons-material";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default function LoginForm() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [signInError, setSignInError] = useState("");

  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields((prevState) => {
      const updatedFields = {
        ...prevState,
        [e.target?.name]: e.target.value,
      };

      validateField(e.target.name, e.target.value);
      return updatedFields;
    });
  }

  function validateField(name: string, value: string) {
    let error = "";

    if (!value.trim()) {
      error = `This field is required.`;
    }

    setErrors((prevState) => {
      return { ...prevState, [name]: error };
    });
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", fields);

    if (res?.error) {
      setSignInError(res.error);
      console.error(signInError);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" method="post">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Email"
        color="primary"
        type="email"
        name="email"
        error={!!errors.email}
        helperText={errors.email}
        onChange={handleFormInputChange}
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
        name="password"
        error={!!errors.password}
        helperText={errors.password}
        onChange={handleFormInputChange}
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

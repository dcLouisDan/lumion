"use client";

import { registerUser } from "@/actions/user-actions";
import { Lock, Mail, Person } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";

type UserSignupForm = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

export default function SignUpForm() {
  const [fields, setFields] = useState<UserSignupForm>({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [errors, setErrors] = useState<UserSignupForm>({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [formErrors, setFormError] = useState<string | null>(null);
  const isFormIncomplete = Object.values(fields).some(
    (value) => value.trim() === ""
  );

  const hasErrors = Object.values(errors).some((value) => value.trim() !== "");

  const isSubmitDisabled = isFormIncomplete || hasErrors;

  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields((prevState) => {
      const updatedFields = {
        ...prevState,
        [e.target?.name]: e.target.value,
      };

      validateField(e.target.name, e.target.value);
      validatePassword(updatedFields.password, updatedFields.passwordRepeat);
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

  function validatePassword(password: string, passwordRepeat: string) {
    let error = "";

    if (password !== passwordRepeat) {
      error = "Passwords do not match.";
    }

    setErrors((prevState) => {
      return { ...prevState, password: error, passwordRepeat: error };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const response = await registerUser(fields);

    if (!response.success) {
      // setFormError(response.error);
      console.log(response.error);
      return;
    }

    console.log("Success");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Name"
        name="name"
        onChange={handleFormInputChange}
        error={!!errors.name}
        helperText={errors.name}
        color="primary"
        type="text"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Email"
        name="email"
        error={!!errors.email}
        helperText={errors.email}
        onChange={handleFormInputChange}
        color="primary"
        type="email"
        required
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
        name="password"
        error={!!errors.password}
        helperText={errors.password}
        onChange={handleFormInputChange}
        type="password"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Repeat Password"
        name="passwordRepeat"
        error={!!errors.passwordRepeat}
        helperText={errors.passwordRepeat}
        onChange={handleFormInputChange}
        type="password"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        disableElevation
        type="submit"
        disabled={isSubmitDisabled}
      >
        Create Account
      </Button>
    </form>
  );
}

import { Button, InputAdornment, TextField } from "@mui/material";
import { Metadata } from "next";
import React from "react";
import { Lock, Mail, Person } from "@mui/icons-material";
import Link from "next/link";
import LightbulbMomentSVG from "@/components/LightbulbMomentSVG";
import { Anton } from "next/font/google";

export const metadata: Metadata = {
  title: "Lumion - Login",
};

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function LoginPage() {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 h-full px-1 sm:px-5">
      <div className="hidden sm:block lg:col-span-2 relative">
        <div className={"mt-20 leading-snug text-5xl " + anton.className}>
          Unlock your <br />{" "}
          <span className={anton.className + " text-rose-700"}>
            {" "}
            Personalized Experience.
          </span>
        </div>
        <div className="absolute h-24 w-72 left-0 bottom-80 -scale-x-100">
          <LightbulbMomentSVG />
        </div>
      </div>
      <div className="h-full flex justify-center flex-col px-5">
        <div
          className={
            "text-center mb-20 text-5xl font-bold text-rose-700 " +
            anton.className
          }
        >
          Tell us about yourself.
        </div>
        <form action="" className="flex flex-col gap-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Name"
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
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Repeat Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" disableElevation type="submit">
            Create Account
          </Button>
        </form>
        <div className="flex mt-12 gap-2 py-2 justify-center">
          <div>Already have an account?</div>
          <Link
            href="/login"
            className="font-bold text-rose-700 hover:text-rose-600 active:text-rose-400"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

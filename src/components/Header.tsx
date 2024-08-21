"use client";

import { Button } from "@mui/material";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import { Anton } from "next/font/google";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

const authButtonGroup = (
  <div className="flex gap-2 py-1">
    <Link href="/auth/login">
      <Button variant="contained" disableElevation>
        Login
      </Button>
    </Link>
    <Link href="/auth/signup">
      <Button variant="outlined" disableElevation>
        Sign-up
      </Button>
    </Link>
  </div>
);

export default function Header({
  authUser = null,
}: {
  authUser?: User | null;
}) {
  const pathname = usePathname();
  const authPaths = ["/auth/login", "/auth/signup"];
  if (!authUser) {
    return (
      <header className="flex py-4 px-4 sm:px-2 items-center">
        <div className="flex-1">
          <Link href="/">
            <Button
              fullWidth={false}
              className={
                anton.className + " text-2xl sm:text-4xl text-rose-700 "
              }
            >
              Lumion
            </Button>
          </Link>
        </div>
        {authPaths.includes(pathname) ? "" : authButtonGroup}
      </header>
    );
  } else {
    return (
      <header className="flex py-4 px-4 sm:px-2 items-center">
        <div className="flex-1">
          <Link href="/">
            <Button
              fullWidth={false}
              className={
                anton.className + " text-2xl sm:text-4xl text-rose-700 "
              }
            >
              Lumion
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div>Welcome {authUser.name}</div>
          <Link href="#">
            <Button
              variant="contained"
              disableElevation
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              Sign-out
            </Button>
          </Link>
        </div>
      </header>
    );
  }
}

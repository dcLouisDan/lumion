"use client";

import { Button } from "@mui/material";
import { Anton } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

const authButtonGroup = (
  <div className="flex gap-2 py-1">
    <Link href="/login">
      <Button variant="contained" disableElevation>
        Login
      </Button>
    </Link>
    <Link href="/signup">
      <Button variant="outlined" disableElevation>
        Sign-up
      </Button>
    </Link>
  </div>
);

export default function Header() {
  const pathname = usePathname();
  const authPaths = ["/login", "/signup"];

  return (
    <header className="flex py-4 px-4 sm:px-2 items-center">
      <div className="flex-1">
        <Link href="/">
          <Button
            fullWidth={false}
            className={anton.className + " text-2xl sm:text-4xl text-rose-700 "}
          >
            Lumion
          </Button>
        </Link>
      </div>
      {authPaths.includes(pathname) ? "" : authButtonGroup}
    </header>
  );
}

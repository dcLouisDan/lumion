"use client";

import { brandFont } from "@/lib/theme";
import { Button } from "@mui/material";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

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

function NavLink({
  href,
  children,
  ...rest
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="py-2 hover:border-b-2 px-2 transition-all ease-in-out duration-75 border-black text-sm sm:text-base"
      {...rest}
    >
      {children}
    </Link>
  );
}

export default function Header({
  authUser = null,
}: {
  authUser?: User | null;
}) {
  const pathname = usePathname();
  const authPaths = ["/auth/login", "/auth/signup"];
  if (!authUser) {
    return (
      <header className="flex flex-col sm:flex-row py-6 px-4 sm:px-2 items-center">
        <div className="flex-1 mb-2 sm:mb-0">
          <Link href="/">
            <Button
              fullWidth={false}
              className={
                brandFont.className + " text-2xl sm:text-3xl text-gray-900 "
              }
            >
              Introverted Ink
            </Button>
          </Link>
        </div>
        <nav className="flex items-center justify-around gap-3">
          <NavLink href="/blogs">blogs</NavLink>
          <NavLink href="/sketchbook">sketchbook</NavLink>
          <NavLink href="/about">about</NavLink>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="flex py-8 px-4 sm:px-2 items-center">
        <div className="flex-1">
          <Link href="/">
            <Button
              fullWidth={false}
              className={
                brandFont.className + " text-2xl sm:text-3xl text-gray-900 "
              }
            >
              Introverted Ink
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <div>
            Welcome <span className="font-bold">{authUser.name}</span>
          </div>
          <Link href="#">
            <Button
              size="small"
              variant="outlined"
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

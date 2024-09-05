"use client";

import { brandFont } from "@/lib/theme";
import { Button, TextField } from "@mui/material";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import SearchInput from "./SearchInput";
import { Roles } from "@/lib/utils";

function AuthButtonGroup() {
  return (
    <div className="flex gap-2 py-1">
      <Link href="/auth/login">
        <Button variant="contained" disableElevation size="small">
          Login
        </Button>
      </Link>
      <Link href="/auth/signup">
        <Button variant="outlined" disableElevation size="small">
          Sign-up
        </Button>
      </Link>
    </div>
  );
}

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

function HeaderNavLinkGroup({
  isAdmin = false,
  layoutClasses,
}: {
  isAdmin?: boolean;
  layoutClasses: string;
}) {
  return (
    <nav className={"items-center justify-around gap-3 " + layoutClasses}>
      <NavLink href="/blogs">blogs</NavLink>
      {/* <NavLink href="/sketchbook">sketchbook</NavLink> */}
      <NavLink href="/about">about</NavLink>
      {isAdmin && <NavLink href="/dashboard">admin</NavLink>}
    </nav>
  );
}

export default function Header({
  authUser = null,
}: {
  authUser?: User | null;
}) {
  //const pathname = usePathname();
  //const authPaths = ["/auth/login", "/auth/signup"];
  if (!authUser) {
    return (
      <header className="flex flex-col gap-2 py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:px-2 items-center gap-4">
          <div className="sm:flex-1 sm:mb-0">
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
          <HeaderNavLinkGroup layoutClasses="hidden md:flex" />
          <div className="hidden min-w-52 max-w-64 sm:flex sm:flex-1">
            <SearchInput />
          </div>
          <AuthButtonGroup />
        </div>
        <HeaderNavLinkGroup layoutClasses="flex md:hidden border rounded-lg border-gray-700 px-2" />
        <div className="flex sm:hidden justify-center">
          <SearchInput />
        </div>
      </header>
    );
  } else {
    return (
      <header className="flex py-4 sm:py-8 px-4 flex-col gap-2">
        <div className="flex sm:px-2 items-center">
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
            <HeaderNavLinkGroup
              isAdmin={authUser.role === Roles.ADMIN}
              layoutClasses="hidden md:flex"
            />
            <div className="hidden max-w-64 min-w-52 sm:flex sm:flex-1">
              <SearchInput />
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
        </div>
        <HeaderNavLinkGroup
          isAdmin={true}
          layoutClasses="flex md:hidden border rounded-lg border-gray-700 px-2"
        />
        <div className="flex sm:hidden justify-center">
          <SearchInput />
        </div>
      </header>
    );
  }
}

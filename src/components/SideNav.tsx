"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

function SideNavLink({
  href = "/",
  children,
  ...rest
}: {
  href?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  const activeClassNames =
    pathname === href ? "text-gray-900" : "text-gray-500";

  return (
    <Link
      href={href}
      {...rest}
      className={
        "hover:font-semibold transition-all ease-in-out duration-75 px-4 py-3 " +
        activeClassNames
      }
    >
      {children}
    </Link>
  );
}

export default function SideNav() {
  return (
    <nav className="flex flex-col border border-gray-700 rounded-lg h-fit mx-2 mt-14">
      <SideNavLink href="/dashboard">Dashboard</SideNavLink>
      <SideNavLink href="/posts">Posts</SideNavLink>
    </nav>
  );
}

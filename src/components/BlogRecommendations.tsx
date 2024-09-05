"use server";
import prisma from "@/lib/db";
import { dayjsExtended } from "@/lib/utils";
import { Paper } from "@mui/material";
import Link from "next/link";
import React from "react";

export default async function BlogRecommendations() {
  const blogs = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      published: true,
    },
    include: {
      author: true,
    },
    take: 8,
  });

  return (
    <Paper
      variant="outlined"
      className="hidden divide-y sm:flex flex-col items-start h-fit"
    >
      <h1 className="font-bold p-4">Latest Blogs</h1>
      {blogs.map((blog) => (
        <Link
          href={`/blogs/${blog?.slug}`}
          className="px-4 py-2 text-start text-xs w-full hover:text-gray-700 hover:underline hover:bg-gray-100 transition-all ease-in-out duration-150"
        >
          <h6 className="mb-1">{blog.title}</h6>
          <p className="text-gray-400 text-[10px]">
            {dayjsExtended(blog.createdAt).fromNow().toString()}
          </p>
        </Link>
      ))}
    </Paper>
  );
}

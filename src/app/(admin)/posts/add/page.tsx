import { options } from "@/app/api/auth/[...nextauth]/options";
import AddPostForm from "@/components/AddPostForm";
import prisma from "@/lib/db";
import { brandFont } from "@/lib/theme";
import { Breadcrumbs, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function AddPostPage() {
  const session = await getServerSession(options);
  const authUser = session?.user;
  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();
  return (
    <div>
      <Breadcrumbs className="mb-5">
        <Link
          href="/posts"
          color="inherit"
          className="hover:text-gray-500 hover:border-b-2 border-gray-500"
        >
          Posts
        </Link>
        <Typography
          color="text.primary"
          className={brandFont.className + " text-3xl"}
        >
          Add New Post
        </Typography>
      </Breadcrumbs>
      <AddPostForm user={authUser} categories={categories} tags={tags} />
    </div>
  );
}

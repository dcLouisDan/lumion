import { options } from "@/app/api/auth/[...nextauth]/options";
import AddPostForm from "@/components/AddPostForm";
import prisma from "@/lib/db";
import { brandFont } from "@/lib/theme";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { Edit, Visibility } from "@mui/icons-material";
import DeleteButtonWithModal from "@/components/DeleteButtonWithModal";
import PostParser from "@/components/PostParser";


export default async function PostPage({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { isEditing?: boolean };
}) {
  console.log(searchParams);
  const id = params.id;
  const isEditing = searchParams.isEditing ?? false;
  const session = await getServerSession(options);
  const authUser = session?.user;
  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
      categories: true,
      tags: true,
    },
  });


  return (
    <div>
      <section className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-5 sm:mb-0">
        <Breadcrumbs className="sm:mb-5">
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
            Post No. {id}
          </Typography>
        </Breadcrumbs>
        <div className="flex flex-row gap-2">
          {!isEditing ? (
            <Link
              href={{
                pathname: `/posts/${id}`,
                query: {
                  isEditing: true,
                },
              }}
            >
              <Button disableElevation variant="contained">
                <Edit fontSize="inherit" />
                <span className="ms-2">Edit Post</span>
              </Button>
            </Link>
          ) : (
            <Link href={`/posts/${id}`}>
              <Button disableElevation variant="outlined">
                <Visibility fontSize="inherit" />
                <span className="ms-2">View Post</span>
              </Button>
            </Link>
          )}
          <DeleteButtonWithModal id={id} />
        </div>
      </section>
      {!isEditing ? (
        <PostParser post={post} />
      ) : (
        <AddPostForm
          user={authUser}
          categories={categories}
          tags={tags}
          postData={post}
          chosenCategoriesData={post?.categories}
          chosenTagsData={post?.tags}
          method="update"
        />
      )}
    </div>
  );
}

import PostInteractionsPanels from "@/components/PostInteractionsPanels";
import PostParser from "@/components/PostParser";
import prisma from "@/lib/db";
import { Paper } from "@mui/material";
import React from "react";

export default async function BlogViewPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
      tags: true,
      categories: true,
      comments: true,
    },
  });

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      <div className="col-span-3 px-2 sm:px-4">
        <PostParser post={post} />
      </div>
      <div className="flex flex-col gap-4">
        <PostInteractionsPanels />
      </div>
    </div>
  );
}

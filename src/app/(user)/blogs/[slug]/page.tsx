import PostParser from "@/components/PostParser";
import prisma from "@/lib/db";
import React from "react";

export default async function BlogViewPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post =  await prisma.post.findUnique({
    where: {
      slug: slug
    },
    include:{
      author: true,
      tags: true,
      categories: true,
      comments: true
    }
  })

  return <div>
    <PostParser post={post} />
  </div>;
}

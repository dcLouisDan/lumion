import { options } from "@/app/api/auth/[...nextauth]/options";
import BlogRecommendations from "@/components/BlogRecommendations";
import PostInteractionsPanels from "@/components/PostInteractionsPanels";
import PostParser from "@/components/PostParser";
import prisma from "@/lib/db";
import { CommentExtend } from "@/lib/types/modelTypesExtended";
import { getServerSession } from "next-auth";
import React from "react";

export default async function BlogViewPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(options);
  const authUser = session?.user;
  const slug = params.slug;
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
      tags: true,
      categories: true,
      comments: {
        include: {
          user: true,
        },
      },
      likes: true,
    },
  });
  const isLiked = post?.likes.some(
    (like) => like?.userId === Number(authUser?.id)
  );
  const comments = post?.comments?.map((comment) => {
    return {
      user: comment.user,
      id: comment.id,
      content: comment.content,
      postId: comment.postId,
      userId: comment.userId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  });
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      <div className="col-span-3 px-2 sm:px-4">
        <PostParser post={post} />
      </div>
      <div className="flex flex-col gap-4">
        <PostInteractionsPanels
          isLikedStatus={isLiked}
          isSignedIn={!!authUser}
          likesTotal={post?.likes.length}
          userId={Number(authUser?.id)}
          postId={post?.id}
          comments={comments}
        />
        <BlogRecommendations />
      </div>
    </div>
  );
}

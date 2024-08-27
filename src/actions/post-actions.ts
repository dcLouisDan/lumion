"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addNewPost(post: Prisma.PostCreateInput) {
  try {
    if (!post.title.trim()) {
      throw new Error("Post title should not be empty.");
    }
    if (!post.content.trim()) {
      throw new Error("Post content should not be empty.");
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        slug: post.slug,
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });

    if (existingPost !== null) {
      throw new Error("Post title is already used.");
    }

    await prisma.post
      .create({
        data: post,
      })
      .catch((error) => {
        throw new Error(error);
      });
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updatePost(
  post: Prisma.PostUpdateInput,
  postId: number | undefined
) {
  try {
    if (!postId) {
      throw new Error("Post ID should not be undefined.");
    }
    if (!post.title?.toString().trim() || !post.title) {
      throw new Error("Post title should not be empty.");
    }
    if (!post.content?.toString().trim()) {
      throw new Error("Post content should not be empty.");
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        slug: post.slug?.toString(),
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });

    if (existingPost !== null && existingPost.id !== postId) {
      throw new Error("Post title is already used.");
    }

    await prisma.post
      .update({
        where: {
          id: postId,
        },
        data: post,
      })
      .catch((error) => {
        throw new Error(error);
      });
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deletePost(id: number) {
  try {
    if (!id) {
      throw new Error("Post ID required");
    }

    await prisma.post
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        throw new Error(error as string);
      });

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updatePostPublishedState(
  id: number,
  publishedState: boolean
) {
  try {
    if (!id) {
      throw new Error("Post ID required");
    }

    await prisma.post
      .update({
        where: {
          id: id,
        },
        data: {
          published: publishedState,
        },
      })
      .catch((error) => {
        throw new Error(error as string);
      });

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

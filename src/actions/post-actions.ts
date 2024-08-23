"use server"

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function addNewPost(post: Prisma.PostCreateInput) {
  try {
    if(!post.title.trim()){
      throw new Error("Post title should not be empty.")
    }
    if(!post.content.trim()){
      throw new Error("Post content should not be empty.")
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        title: post.title,
        slug: post.slug
      },
      select:{
        id: true,
        title: true,
        slug: true
      }
    })

    if(existingPost !== null) {
      throw new Error("Post title already exists.")
    }

    await prisma.post.create({
      data: post
    }).catch((error) => {
      throw new Error(error)
    })
    return {success: true}
  } catch (error) {
    return {success : false, error: (error as Error).message}
  }
}
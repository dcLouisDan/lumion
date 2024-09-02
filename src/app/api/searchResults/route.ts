import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  const pageSize = req.nextUrl.searchParams.get("pageSize");
  const searchTerm = req.nextUrl.searchParams.get("search") as string;
  const skip = (Number(page) - 1) * Number(pageSize);
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      title: {
        contains: searchTerm
      }
    },
    skip,
    take: Number(pageSize),
    include: {
      author: true,
      categories: true,
      tags: true,
    },
    orderBy: {
      title: "asc"
    },
  });

  const totalPosts = await prisma.post.count({
    where: {
      published: true,
      title: {
        contains: searchTerm
      }
    },
  });

  return Response.json({ posts, totalPosts });
}

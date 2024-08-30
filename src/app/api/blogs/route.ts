import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  const pageSize = req.nextUrl.searchParams.get("pageSize");
  const dateOrder = req.nextUrl.searchParams.get("dateOrder");

  const skip = (Number(page) - 1) * Number(pageSize);
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    skip,
    take: Number(pageSize),
    include: {
      author: true,
      categories: true,
      tags: true,
    },
    orderBy: {
      createdAt: dateOrder === "asc" ? "asc" : "desc",
    },
  });

  const totalPosts = await prisma.post.count({
    where: {
      published: true,
    },
  });

  return Response.json({ posts, totalPosts });
}

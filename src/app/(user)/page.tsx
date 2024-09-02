import PostParser from "@/components/PostParser";
import prisma from "@/lib/db";
import { brandFont } from "@/lib/theme";
import { Paper } from "@mui/material";
import Link from "next/link";

export default async function Home() {
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
    take: 10,
  });

  const latestBlogs = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      published: true,
    },
    include: {
      author: true,
      categories: true,
      tags: true,
    },
    take: 2,
  });

  return (
    <section className="px-4 grid gap-8 grid-cols-4 py-4">
      <div className="col-span-4 sm:col-span-3 flex flex-col gap-4">
        <h1 className={brandFont.className + " text-xl"}></h1>
        {latestBlogs.map((blog) => {
          return (
            <Paper variant="outlined" className="p-4">
              <PostParser post={blog} preview={true} />
            </Paper>
          );
        })}
      </div>
      <div className="hidden sm:flex flex-col gap-4 items-start">
        <h1 className="font-bold">Browse Blogs</h1>
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${blog?.slug}`}
            className="text-start text-xs hover:text-gray-700 hover:underline hover:font-semibold transition-all ease-in-out duration-150"
          >
            {blog.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

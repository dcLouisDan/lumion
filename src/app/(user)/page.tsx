import BlogRecommendations from "@/components/BlogRecommendations";
import PostParser from "@/components/PostParser";
import prisma from "@/lib/db";
import { brandFont } from "@/lib/theme";
import { Paper } from "@mui/material";

export default async function Home() {
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
        {latestBlogs.map((blog) => {
          return (
            <Paper key={blog.id} variant="outlined" className="p-4">
              <PostParser post={blog} preview={true} />
            </Paper>
          );
        })}
      </div>
      <BlogRecommendations />
    </section>
  );
}

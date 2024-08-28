import prisma from "@/lib/db";
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
  });

  return (
    <section className="px-4 grid gap-8 grid-cols-4 py-4">
      <div className="col-span-3"></div>
      <div className="flex flex-col gap-4 items-start">
        <h1 className="font-bold">Browse Blogs</h1>
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${blog?.slug}`}
            className="text-start text-xs hover:text-gray-700 hover:font-semibold transition-all ease-in-out duration-150"
          >
            {blog.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

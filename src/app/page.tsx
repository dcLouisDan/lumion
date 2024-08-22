import prisma from "@/lib/db";

export default async function Home() {
  const blogs = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
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
          <div className="text-start text-xs">{blog.title}</div>
        ))}
      </div>
    </section>
  );
}

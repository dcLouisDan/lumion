import prisma from "@/lib/db";

export async function GET() {
  const options = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
    orderBy: {
      title: "asc",
    },
  });


  return Response.json({ options });
}

// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  //await prisma.user.upsert({
  //  where: {
  //    email: "dan@email.com",
  //  },
  //  update: {
  //    name: "Dan Louis Dela Cruz",
  //  },
  //  create: {
  //    name: "Dan Louis Dela Cruz",
  //    email: "dan@email.com",
  //    password: "$2a$10$eAk79r4h1XF2K6Hh1zfdqew.2B1.8YXZDQN1k2rdG4znC1B/wDaju",
  //  },
  //});
  //
  //await prisma.category.createMany({
  //  data: [
  //    { name: "Daily Reflections" },
  //    { name: "Personal Essays" },
  //    { name: "Random Thoughts" },
  //  ],
  //});

  for (let i = 0; i < 20; i++) {
    // Adjust the number of posts you want to generate
    const fakeTitle = faker.lorem.sentence();
    await prisma.post.create({
      data: {
        title: fakeTitle, // Generate a random title
        slug: fakeTitle.toLowerCase().replace(/\s+/g, "-"),
        content: `
            <p>${faker.lorem.paragraphs({ min: 4, max: 8 })}</p>
            <br />
            <p>${faker.lorem.paragraphs({ min: 4, max: 8 })}</p>
            <br />
            <p>${faker.lorem.paragraphs({ min: 4, max: 8 })}</p>
            <br />
            <p>${faker.lorem.paragraphs({ min: 4, max: 8 })}</p>
`, // Generate random content with 3 paragraphs
        createdAt: faker.date.between({
          from: "2023-12-01T00:00:00.000Z",
          to: "2024-08-30T00:00:00.000Z",
        }),
        authorId: 1, // Set the authorId to 1
        published: true,
        categories: {
          connect: {
            id: Math.floor(Math.random() * 3) + 1, // Random category between 1-3
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

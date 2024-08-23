// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.upsert({
  //   where: {
  //     email: "dan@email.com"
  //   },
  //   update:{
  //     name: "Dan Louis Dela Cruz"
  //   },
  //   create: {
  //     name: "Dan Louis Dela Cruz",
  //     email: "dan@email.com",
  //     password: "$2a$10$eAk79r4h1XF2K6Hh1zfdqew.2B1.8YXZDQN1k2rdG4znC1B/wDaju"
  //   }
  // })

  for (let i = 0; i < 10; i++) {  // Adjust the number of posts you want to generate
    const fakeTitle = faker.lorem.sentence() 
    await prisma.post.create({
      data: {
        title: fakeTitle, // Generate a random title
        slug: fakeTitle.toLowerCase().replace(/\s+/g, "-"),
        content: faker.lorem.paragraphs({min: 4, max: 8}), // Generate random content with 3 paragraphs
        authorId: 1, // Set the authorId to 1
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

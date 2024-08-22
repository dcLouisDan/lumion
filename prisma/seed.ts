// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {  // Adjust the number of posts you want to generate
    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(), // Generate a random title
        content: faker.lorem.paragraphs(3), // Generate random content with 3 paragraphs
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

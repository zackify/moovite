import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seed() {
  // Prisma create query to seed models in database
  await prisma.message.create({ data: { text: "Welcome from prisma!" } });
}

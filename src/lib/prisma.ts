import { PrismaClient } from "@prisma/client/extension";

export const prisma =
  globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Prisma client setup
// Will be functional once DATABASE_URL is configured and `npx prisma generate` is run
//
// Usage:
//   import { prisma } from "@/lib/prisma";
//   const users = await prisma.user.findMany();
//
// Setup steps:
//   1. Set DATABASE_URL in .env
//   2. Run: npx prisma generate
//   3. Run: npx prisma db push (or npx prisma migrate dev)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any;

try {
  // Dynamic import to avoid build errors when Prisma client is not yet generated
  const { PrismaClient } = require("@/generated/prisma");
  const globalForPrisma = globalThis as unknown as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prisma: any | undefined;
  };
  prisma = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
} catch {
  // Prisma client not generated yet — using mock data
  prisma = null;
}

export { prisma };

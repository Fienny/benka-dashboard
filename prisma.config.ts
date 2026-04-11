import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },

  // для migrate
  migrate: {
    url: process.env.DATABASE_URL,
  },

  // для db push (ВОТ ЭТО ТЕБЕ НЕ ХВАТАЕТ)
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
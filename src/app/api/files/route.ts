import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  const files = await prisma.file.findMany({
    where: { projectId: projectId || undefined },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(files);
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  const projectId = formData.get("projectId") as string;

  if (!file || !projectId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, file.name);

  fs.writeFileSync(filePath, buffer);

  // 🔥 СОХРАНЯЕМ В БД
  const saved = await prisma.file.create({
    data: {
      name: file.name,
      path: filePath,
      size: file.size,
      mimeType: file.type,
      category: file.type.startsWith("image")
        ? "photo"
        : file.type.startsWith("video")
        ? "video"
        : "document",
      projectId,
      uploadedBy: "test-user-1", // потом сделаем норм
    },
  });

  return NextResponse.json(saved);
}
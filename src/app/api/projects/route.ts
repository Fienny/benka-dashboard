import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  const body = await request.json();

  const project = await prisma.project.create({
    data: {
      code: "PJ-TAS-" + Math.floor(Math.random() * 10000),
      type: body.type,
      region: body.region,
      internalId: Math.floor(Math.random() * 10000),
      name: body.name,
    },
  });

  return NextResponse.json(project);
}

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}
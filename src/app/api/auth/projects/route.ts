import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
});

export async function POST() {
  try {
    const project = await prisma.project.create({
      data: {
        code: "PJ-TAS-" + Math.floor(Math.random() * 10000),
        type: "PJ",
        region: "TAS",
        internalId: Math.floor(Math.random() * 10000),
        name: "New Project",
      },
    });

    return NextResponse.json(project);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
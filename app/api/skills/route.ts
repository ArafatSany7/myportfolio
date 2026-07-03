import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, icon, categoryName } = body;

    const skill = await prisma.skill.create({
      data: {
        name,
        icon,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          }
        }
      }
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}

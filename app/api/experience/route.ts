import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const exp = await prisma.experience.create({
      data: body
    });

    return NextResponse.json(exp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}

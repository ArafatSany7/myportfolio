import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const edu = await prisma.education.create({
      data: body
    });

    return NextResponse.json(edu, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 });
  }
}

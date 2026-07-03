import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const edu = await prisma.education.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(edu);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = await params;

    await prisma.education.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 });
  }
}

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

    const certificate = await prisma.certificate.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update certificate" }, { status: 500 });
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

    await prisma.certificate.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}

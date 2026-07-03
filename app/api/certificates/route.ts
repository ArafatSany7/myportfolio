import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const certificate = await prisma.certificate.create({
      data: body
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}

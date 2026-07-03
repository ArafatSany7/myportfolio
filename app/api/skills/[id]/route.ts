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
    const { name, icon, categoryName } = body;

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        icon,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          }
        }
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
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

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}

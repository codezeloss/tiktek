import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

// !! GET
export async function GET(
  req: Request,
  { params }: { params: { categoryName: string } }
) {
  try {
    const posts = await prisma.category.findUnique({
      where: {
        name: params.categoryName,
      },
      include: {
        posts: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (e) {
    console.log("CATEGORY_GET", e);
    return NextResponse.json("Internal error. Something went wrong!");
  }
}

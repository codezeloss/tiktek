import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

// !! GET
export async function GET(
  req: Request,
  { params }: { params: { authorEmail: string } }
) {
  try {
    const posts = await prisma.user.findUnique({
      where: {
        email: params.authorEmail,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (e) {
    console.log("AUTHOR_GET", e);
    return NextResponse.json("Internal error. Something went wrong!");
  }
}

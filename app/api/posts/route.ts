import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

// !! POST
export async function POST(req: Request) {
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();

  const authorEmail = "elhoussaineaitx@gmail.com";

  if (!title || !content)
    return NextResponse.json(
      { error: "Title and content are required." },
      { status: 500 }
    );

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        links,
        categoryName: selectedCategory,
        imageUrl,
        publicId,
        authorEmail,
      },
    });

    return NextResponse.json(post);
  } catch (e) {
    console.log("POSTS_POST", e);
    return NextResponse.json("Internal error. Something went wrong!");
  }
}

// !! GET
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (e) {
    console.log("[POSTS_GET]", e);
    return NextResponse.json("Internal error. Something went wrong!");
  }
}

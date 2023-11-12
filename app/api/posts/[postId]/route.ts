import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

// !! GET
export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json(post);
  } catch (e) {
    console.log("POST_GET", e);
    return NextResponse.json("Internal error. Something went wrong!");
  }
}

// !! PATCH
export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();

  try {
    const post = await prisma.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title,
        content,
        links,
        categoryName: selectedCategory,
        imageUrl,
        publicId,
      },
    });

    return NextResponse.json(post);
  } catch (e) {
    console.log("POST_PATCH", e);
    return NextResponse.json("Internal error. Something went wrong!");
  }
}

// !! DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json(post);
  } catch (e) {
    console.log("POST_DELETE", e);
    return NextResponse.json("Internal error. Something went wrong!");
  }
}

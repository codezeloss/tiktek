import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (e) {
    console.log(e);
    return NextResponse.json("Internal error. Something went wrong!");
  }
}

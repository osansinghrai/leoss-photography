import { NextResponse } from "next/server";

const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

export async function GET() {
  try {
    const portfolio = await prisma.portfolio_page.findMany();
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, description, image_url } =await req.json();
    if (!title || !description || !image_url) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const newPortfolio = await prisma.portfolio_page.create({
      data: {
        title,
        description,
        image_url,
      },
    });
    return NextResponse.json(newPortfolio, { status: 201 });
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}

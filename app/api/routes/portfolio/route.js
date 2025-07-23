import { NextResponse } from "next/server";

const { PrismaClient } = require("../../../generated/prisma");
import cloudinary from "@/lib/config/cloudinary";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const portfolio = await prisma.portfolio_page.findMany();
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

// image

export async function POST(req) {
  const formData = await req.formData();

  const image = formData.get("image_url");

  const buffer = Buffer.from(await image.arrayBuffer());
  const imageBase64 = `data:${image.type};base64,${buffer.toString("base64")}`;

  const imageUpload = await cloudinary.uploader.upload(imageBase64, {
    folder: "portfolio_images",
  });

  try {
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    if (!title || !description || !imageUpload) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const newPortfolio = await prisma.portfolio_page.create({
      data: {
        title,
        description,
        image_url: imageUpload.secure_url,
        image_public_id: imageUpload.public_id,
      },
    });
    return NextResponse.json(newPortfolio, { status: 201 });
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const image = formData.get("image_url");

    const buffer = Buffer.from(await image.arrayBuffer());
    const imageBase64 = `data:${image.type};base64,${buffer.toString(
      "base64"
    )}`;

    const imageUpload = await cloudinary.uploader.upload(imageBase64, {
      folder: "portfolio_images",
    });
    if (!id || !title || !description || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const updatedPortfolio = await prisma.portfolio_page.update({
      where: { id },
      data: {
        title,
        description,
        image_url: imageUpload.secure_url,
        image_public_id: imageUpload.public_id,
      },
    });
    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    console.error("Patch error:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const portfolio = await prisma.portfolio_page.findUnique({ where: { id } });

    if (portfolio?.image_public_id) {
      await cloudinary.uploader.destroy(portfolio.image_public_id);
    }
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await prisma.portfolio_page.delete({ where: { id } });
    return NextResponse.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}

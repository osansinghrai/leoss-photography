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
  try {
    const contentType = req.headers.get("content-type");
    let title, description, earlierBase64, recentBase64;

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();

      title = formData.get("title")?.toString();
      description = formData.get("description")?.toString();

      const earlierImage = formData.get("earlier_image_url");
      const recentImage = formData.get("recent_image_url");

      const earlierBuffer = Buffer.from(await earlierImage.arrayBuffer());
      const recentBuffer = Buffer.from(await recentImage.arrayBuffer());

      earlierBase64 = `data:${
        earlierImage.type
      };base64,${earlierBuffer.toString("base64")}`;
      recentBase64 = `data:${recentImage.type};base64,${recentBuffer.toString(
        "base64"
      )}`;
    } else {
      const body = await req.json();
      title = body.title;
      description = body.description;
      earlierBase64 = body.earlier_image_url;
      recentBase64 = body.recent_image_url;
    }
    if (!title || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const earlierUpload = await cloudinary.uploader.upload(earlierBase64, {
      folder: "portfolio_images",
    });

    const recentUpload = await cloudinary.uploader.upload(recentBase64, {
      folder: "portfolio_images",
    });

    const newPortfolio = await prisma.portfolio_page.create({
      data: {
        title,
        description,
        earlier_image_url: earlierUpload.secure_url,
        recent_image_url: recentUpload.secure_url,
        earlier_image_public_id: earlierUpload.public_id,
        recent_image_public_id: recentUpload.public_id,
      },
    });
    return NextResponse.json(newPortfolio, { status: 201 });
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
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
    const earlierImage = formData.get("earlier_image_url");
    const recentImage = formData.get("recent_image_url");

    const earlierBuffer = Buffer.from(await earlierImage.arrayBuffer());
    const recentBuffer = Buffer.from(await recentImage.arrayBuffer());

    const earlierBase64 = `data:${
      earlierImage.type
    };base64,${earlierBuffer.toString("base64")}`;
    const recentBase64 = `data:${
      recentImage.type
    };base64,${recentBuffer.toString("base64")}`;

    const earlierUpload = await cloudinary.uploader.upload(earlierBase64, {
      folder: "portfolio_images",
    });

    const recentUpload = await cloudinary.uploader.upload(recentBase64, {
      folder: "portfolio_images",
    });

    if (!id || !title || !description || !earlierUpload || !recentUpload) {
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
        earlier_image_url: earlierUpload.secure_url,
        recent_image_url: recentUpload.secure_url,
        earlier_image_public_id: earlierUpload.public_id,
        recent_image_public_id: recentUpload.public_id,
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

    if (portfolio?.earlier_image_public_id) {
      await cloudinary.uploader.destroy(portfolio.earlier_image_public_id);
    }
    if (portfolio?.recent_image_public_id) {
      await cloudinary.uploader.destroy(portfolio.recent_image_public_id);
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

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

      if (earlierImage) {
        const earlierBuffer = Buffer.from(await earlierImage.arrayBuffer());
        earlierBase64 = `data:${
          earlierImage.type
        };base64,${earlierBuffer.toString("base64")}`;
        earlierUpload = await cloudinary.uploader.upload(earlierBase64, {
          folder: "portfolio_images",
        });
      }
      if (recentImage) {
        const recentBuffer = Buffer.from(await recentImage.arrayBuffer());
        recentBase64 = `data:${recentImage.type};base64,${recentBuffer.toString(
          "base64"
        )}`;
        recentUpload = await cloudinary.uploader.upload(recentBase64, {
          folder: "portfolio_images",
        });
      }
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

    if (!earlierBase64 && !recentBase64) {
      return NextResponse.json(
        { error: "Atleast one image is required" },
        { status: 400 }
      );
    }

    let earlierUpload = null;
    let recentUpload = null;

    if (earlierBase64) {
      earlierUpload = await cloudinary.uploader.upload(earlierBase64, {
        folder: "portfolio_images",
      });
    }
    if (recentBase64) {
      recentUpload = await cloudinary.uploader.upload(recentBase64, {
        folder: "portfolio_images",
      });
    }

    const newPortfolio = await prisma.portfolio_page.create({
      data: {
        title,
        description,
        earlier_image_url: earlierBase64
          ? earlierUpload
            ? earlierUpload.secure_url
            : ""
          : null,
        recent_image_url: recentBase64
          ? recentUpload
            ? recentUpload.secure_url
            : ""
          : null,
        earlier_image_public_id: earlierBase64
          ? earlierUpload
            ? earlierUpload.public_id
            : ""
          : null,
        recent_image_public_id: recentBase64
          ? recentUpload
            ? recentUpload.public_id
            : ""
          : null,
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
    const contentType = req.headers.get("content-type");
    let id, title, description, earlierBase64, recentBase64;

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();

      id = formData.get("id")?.toString();
      title = formData.get("title")?.toString();
      description = formData.get("description")?.toString();

      const earlierImage = formData.get("earlier_image_url");
      const recentImage = formData.get("recent_image_url");

      if (earlierImage) {
        const earlierBuffer = Buffer.from(await earlierImage.arrayBuffer());
        earlierBase64 = `data:${
          earlierImage.type
        };base64,${earlierBuffer.toString("base64")}`;
      }
      if (recentImage) {
        const recentBuffer = Buffer.from(await recentImage.arrayBuffer());
        recentBase64 = `data:${recentImage.type};base64,${recentBuffer.toString(
          "base64"
        )}`;
      }
    } else {
      const body = await req.json();
      id = body.id;
      title = body.title;
      description = body.description;
      earlierBase64 = body.earlier_image_url;
      recentBase64 = body.recent_image_url;
    }
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Prepare update data
    const updateData = {
      title,
      description,
    };

    // Only handle image uploads if new images are provided
    if (earlierBase64) {
      const earlierUpload = await cloudinary.uploader.upload(earlierBase64, {
        folder: "portfolio_images",
      });
      updateData.earlier_image_url = earlierUpload.secure_url;
      updateData.earlier_image_public_id = earlierUpload.public_id;
    }
    
    if (recentBase64) {
      const recentUpload = await cloudinary.uploader.upload(recentBase64, {
        folder: "portfolio_images",
      });
      updateData.recent_image_url = recentUpload.secure_url;
      updateData.recent_image_public_id = recentUpload.public_id;
    }

    const UpdatePortfolio = await prisma.portfolio_page.update({
      where: { id: Number(id) },
      data: updateData,
    });
    return NextResponse.json(UpdatePortfolio, { status: 200 });
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
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const portfolio = await prisma.portfolio_page.findUnique({
      where: { id: Number(id) },
    });

    if (portfolio?.earlier_image_public_id) {
      await cloudinary.uploader.destroy(portfolio.earlier_image_public_id);
    }
    if (portfolio?.recent_image_public_id) {
      await cloudinary.uploader.destroy(portfolio.recent_image_public_id);
    }
    await prisma.portfolio_page.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio data" },
      { status: 500 }
    );
  }
}

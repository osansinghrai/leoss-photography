import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const experience = await prisma.experience_page.findMany();
    return NextResponse.json(experience);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type");
    let year, title, description, location, category;

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();

      year = formData.get("date");
      title = formData.get("title").toString();
      description = formData.get("description").toString();
      location = formData.get("location").toString();
      category = formData.get("category").toString();
    } else {
      const body = await req.json();
      year = body.year;
      title = body.title;
      description = body.description;
      location = body.location;
      category = body.category;
    }
    if (!year || !title || !description || !location || !category)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    const newExperience = await prisma.experience_page.create({
      data: {
        year,
        title,
        description,
        location,
        category,
      },
    });
    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}
export async function PATCH(req) {
  try {
    const contentType = req.headers.get("content-type");
    let id, year, title, description, location, category;

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();

      id = formData.get("id");
      year = formData.get("date");
      title = formData.get("title").toString();
      description = formData.get("description").toString();
      location = formData.get("location").toString();
      category = formData.get("category").toString();
    } else {
      const body = await req.json();
      id = body.id;
      year = body.year;
      title = body.title;
      description = body.description;
      location = body.location;
      category = body.category;
    }
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const updateExperience = await prisma.experience_page.update({
      where: { id: Number(id) },
      data: {
        year,
        title,
        description,
        location,
        category,
      },
    });
    return NextResponse.json(updateExperience, { status: 201 });
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
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
    const experience = await prisma.experience_page.findUnique({
      where: { id: Number(id) },
    });
    await prisma.experience_page.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete experience data" },
      { status: 500 }
    );
  }
}

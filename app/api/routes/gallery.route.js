const express = require("express");
const { PrismaClient } = require("../../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const gallery = await prisma.gallery_page.findMany();
    res.status(200).json(gallery);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, image_url, category } = req.body;
    if (!title || !image_url || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const newGallery = await prisma.gallery_page.create({
      data: {
        title, image_url, category
      },
    });
    res.status(201).json(newGallery);
  } catch (error) {
    console.error("Post error:", error);
    res.status(500).json({ error: "Failed to create message" });
  }
});

module.exports = router;

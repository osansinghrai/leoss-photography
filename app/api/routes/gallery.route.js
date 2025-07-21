const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("../../generated/prisma");

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/gallery", async (req, res) => {
  try {
    const gallery = await prisma.gallery_page.findMany();
    res.status(200).json(gallery);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/gallery", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

module.exports = app;

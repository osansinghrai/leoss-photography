const express = require("express");
const { PrismaClient } = require("../../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const portfolio = await prisma.portfolio_page.findMany();
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, image_url } = req.body;
    if (!title || !description || !image_url) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const newPortfolio = await prisma.portfolio_page.create({
      data: {
        title, description, image_url
      },
    });
    res.status(201).json(newPortfolio);
  } catch (error) {
    console.error("Post error:", error);
    res.status(500).json({ error: "Failed to create message" });
  }
});

module.exports = router;

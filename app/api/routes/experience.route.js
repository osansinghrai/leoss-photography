const express = require("express");
const { PrismaClient } = require("../../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const experience = await prisma.experience_page.findMany();
    res.status(200).json(experience);
  } catch (error) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, experience, skills, awards, accomplishment } = req.body;
    if (!title || !experience || !skills || !awards || !accomplishment) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const newExperience = await prisma.experience_page.create({
      data: {
        title, experience, skills, awards, accomplishment
      },
    });
    res.status(201).json(newExperience);
  } catch (error) {
    console.error("Post error:", error);
    res.status(500).json({ error: "Failed to create message" });
  }
});

module.exports = router;

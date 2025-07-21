const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("../../generated/prisma");

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/experience", async (req, res) => {
  try {
    const experience = await prisma.experience_page.findMany();
    res.status(200).json(experience);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/experience", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

module.exports = app;

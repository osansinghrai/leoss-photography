const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("../../generated/prisma");

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/portfolio", async (req, res) => {
  try {
    const portfolio = await prisma.portfolio_page.findMany();
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/portfolio", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

module.exports = app;

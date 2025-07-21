const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("../../generated/prisma");

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/contact", async (req, res) => {
    try {
        const messages = await prisma.contact_page.findMany();
        res.status(200).json(messages);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.post("/api/contact", async (req, res) => {
    try {
        const { full_name, email, messages } = req.body;
        if (!full_name || !email || !messages) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const newMessage = await prisma.contact_page.create({
            data: {
                full_name,
                email,
                messages,
            },
        });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Post error:", error);
        res.status(500).json({ error: "Failed to create message" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

module.exports = app;

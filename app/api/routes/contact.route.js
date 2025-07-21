const express = require("express");
const { PrismaClient } = require("../../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const messages = await prisma.contact_page.findMany();
        res.status(200).json(messages);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.post("/", async (req, res) => {
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

module.exports = router;

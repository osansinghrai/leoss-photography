const express = require("express");
const cors = require("cors");

const contactRoute = require("./app/api/routes/contact.route.js");
const experienceRoute = require("./app/api/routes/experience.route.js");
const galleryRoute = require("./app/api/routes/gallery.route.js");
const portfolioRoute = require("./app/api/routes/portfolio.route.js");

const app = express();
app.use(cors());
const PORT = 3000

app.use(express.json());
app.use("/api/contact", contactRoute);
app.use("/api/experience", experienceRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/portfolio", portfolioRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
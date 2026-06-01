// server.js

const express = require("express");
const path = require("path");
require("dotenv").config();

const pageRoutes = require("./routes/pageRoutes");

const app = express();

// Port
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", pageRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

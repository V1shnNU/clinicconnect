// Load environment variables FIRST
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("ClinicConnect Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
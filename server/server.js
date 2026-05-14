const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 Serve uploaded images
app.use("/uploads", express.static("uploads"));

// 🔹 Routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// 🔹 DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.log("DB Error:", err));

// 🔹 Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
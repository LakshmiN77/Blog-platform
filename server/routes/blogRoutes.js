const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// controllers
const {
  createBlog,
  getBlogs,
  toggleLike,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");

// auth middleware
const auth = require("../middleware/auth");

// 🔹 Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 🔹 Routes

// GET all blogs
router.get("/", getBlogs);

// CREATE blog
router.post("/create", auth, upload.single("image"), createBlog);

// LIKE / UNLIKE
router.put("/like/:id", auth, toggleLike);

// UPDATE blog
router.put(
  "/update/:id",
  auth,
  upload.single("image"),   // 🔥 REQUIRED
  updateBlog
);

// DELETE blog
router.delete("/delete/:id", auth, deleteBlog);

//

module.exports = router;
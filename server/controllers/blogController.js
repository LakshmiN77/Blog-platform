const Blog = require("../models/blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      image: req.file ? req.file.filename : null,
      author: req.user.id   // 👈 important
    });

    await blog.save();
    res.json(blog);

  } catch (err) {
    res.status(500).json("Error");
  }
};

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};
exports.toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    const userId = req.user.id;

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.json(blog);

  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json("Blog not found");

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json("Not allowed");
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    // 🖼️ Update image if new one uploaded
    if (req.file) {
      blog.image = req.file.filename;
    }

    await blog.save();

    res.json(blog);

  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json("Not allowed");
    }

    await blog.deleteOne();

    res.json("Deleted");

  } catch {
    res.status(500).json("Error");
  }
};
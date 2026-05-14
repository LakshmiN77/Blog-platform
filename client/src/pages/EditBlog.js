import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // 📥 Load blog data
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/blogs")
      .then(res => {
        const blog = res.data.find(b => b._id === id);
        if (blog) {
          setTitle(blog.title);
          setContent(blog.content);

          if (blog.image) {
            setPreview(`http://127.0.0.1:5000/uploads/${blog.image}`);
          }
        }
      });
  }, [id]);

  // 🖼️ Handle image change + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔄 Update blog
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `http://127.0.0.1:5000/api/blogs/update/${id}`,
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Blog updated successfully ✅");
      navigate("/home");

    } catch (err) {
      console.log(err.response?.data);
      alert("Update failed");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>Edit Blog</h2>

        {/* Title */}
        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content */}
        <textarea
          value={content}
          placeholder="Enter content"
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="preview-img"
          />
        )}

        {/* Upload New Image */}
        <input type="file" onChange={handleImageChange} />

        {/* Update Button */}
        <button className="update-btn" onClick={handleUpdate}>
          Update Blog
        </button>
      </div>
    </div>
  );
}

export default EditBlog;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
const navigate = useNavigate();
  const handleCreate = async () => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    await axios.post(
      "http://127.0.0.1:5000/api/blogs/create",
      formData,
      {
        headers: { Authorization: token }
      }
    );

    alert("Blog created ✅");

    // 🔥 Navigate to Home
    navigate("/home");

  } catch (err) {
    console.log(err.response?.data);
    alert("Upload failed");
  }
};

  return (
    <div>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea onChange={e => setContent(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}

export default CreateBlog;
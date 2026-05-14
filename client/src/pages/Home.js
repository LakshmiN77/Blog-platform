import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  // 🔐 Protect page
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchBlogs();
    }
  }, [navigate]);

  // 📥 Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/blogs");
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setBlogs([]);
    }
  };

  // ❤️ Like toggle
  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://127.0.0.1:5000/api/blogs/like/${id}`,
        {},
        {
          headers: { Authorization: token }
        }
      );

      setBlogs((prev) =>
        prev.map((blog) =>
          blog._id === id ? res.data : blog
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  // 🗑 Delete blog
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://127.0.0.1:5000/api/blogs/delete/${selectedId}`,
        {
          headers: { Authorization: token }
        }
      );

      setBlogs((prev) =>
        prev.filter((b) => b._id !== selectedId)
      );

      setShowConfirm(false);
      setSelectedId(null);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          All Blogs
        </h2>

        {blogs.length === 0 ? (
          <p style={{ textAlign: "center" }}>No blogs available</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px"
            }}
          >
            {blogs.map((blog) => {
              const token = localStorage.getItem("token");

              let userId = null;

              if (token) {
                try {
                  const decoded = JSON.parse(atob(token.split(".")[1]));
                  userId = decoded.id;
                } catch {
                  userId = null;
                }
              }

              const liked = blog.likes?.includes(userId);
              const isOwner = blog.author === userId;

              return (
                <div
                  key={blog._id}
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    background: "#fff"
                  }}
                >
                  {/* 📸 IMAGE */}
                  {blog.image && (
                    <img
                      src={`http://127.0.0.1:5000/uploads/${blog.image}`}
                      alt={blog.title}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover"
                      }}
                    />
                  )}

                  {/* 📝 CONTENT */}
                  <div style={{ padding: "15px" }}>
                    <h3>{blog.title}</h3>
                    <p style={{ color: "#555" }}>{blog.content}</p>

                    {/* ❤️ LIKE */}
                    <button
                      onClick={() => handleLike(blog._id)}
                      style={{
                        marginTop: "10px",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        background: liked ? "#ff4d6d" : "#eee",
                        color: liked ? "#fff" : "#000"
                      }}
                    >
                      {liked ? "💖" : "🤍"} {blog.likes?.length || 0}
                    </button>

                    {/* ✏️ EDIT + DELETE */}
                    {isOwner && (
                      <div style={{ marginTop: "10px" }}>
                        <button
                          onClick={() => navigate(`/edit/${blog._id}`)}
                          style={{ marginRight: "10px" }}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() => {
                            setSelectedId(blog._id);
                            setShowConfirm(true);
                          }}
                          style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer"
                          }}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 🔴 DELETE CONFIRM POPUP */}
      {showConfirm && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>Are you sure?</h3>
            <p>This blog will be permanently deleted.</p>

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={handleDelete}
                style={{
                  background: "red",
                  color: "white",
                  marginRight: "10px",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px"
                }}
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "5px"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 🎨 Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const popupStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  width: "300px"
};

export default Home;
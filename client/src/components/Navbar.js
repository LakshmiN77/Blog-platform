import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      background: "#eee"
    }}>
      <div>
        <button onClick={() => navigate("/home")}>Home</button>
        {token && (
          <button onClick={() => navigate("/create")} style={{ marginLeft: "10px" }}>
            Create
          </button>
        )}
      </div>

      {token && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Navbar;
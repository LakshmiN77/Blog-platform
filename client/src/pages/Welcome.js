import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      setEmail("");
      setPassword("");

      navigate("/home");

    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  // 📝 REGISTER
  const handleRegister = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:5000/api/auth/register",
        { name, email, password }
      );

      alert("Registered successfully");

      setName("");
      setEmail("");
      setPassword("");

      setShowRegister(false);
      setShowLogin(true);

    } catch (err) {
      alert(err.response?.data || "Register failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Blog App 🚀</h1>
      <h2>Please Login or Register to Continue</h2>

      {/* BUTTONS */}
      <button
        onClick={() => {
          setEmail("");
          setPassword("");
          setShowLogin(true);
        }}
      >
        Login
      </button>

      <button
        onClick={() => {
          setName("");
          setEmail("");
          setPassword("");
          setShowRegister(true);
        }}
        style={{ marginLeft: "10px" }}
      >
        Register
      </button>

      {/* 🔐 LOGIN MODAL */}
      {showLogin && (
        <div style={overlayStyle}>
          <div style={boxStyle}>
            <h2>Login</h2>

            {/* 🚫 Fake fields to block autofill */}
            <input type="text" style={{ display: "none" }} />
            <input type="password" style={{ display: "none" }} />

            <form autoComplete="off">
              <input
                type="email"
                name="fakeEmail"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br /><br />

              <input
                type="password"
                name="fakePassword"
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br /><br />
            </form>

            <button onClick={handleLogin}>Login</button>

            <button
              onClick={() => {
                setShowLogin(false);
                setEmail("");
                setPassword("");
              }}
              style={{ marginLeft: "10px" }}
            >
              Close
            </button>

            <p>
              Don’t have account?{" "}
              <span
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      )}

      {/* 📝 REGISTER MODAL */}
      {showRegister && (
        <div style={overlayStyle}>
          <div style={boxStyle}>
            <h2>Register</h2>

            {/* 🚫 Fake fields */}
            <input type="text" style={{ display: "none" }} />
            <input type="password" style={{ display: "none" }} />

            <form autoComplete="off">
              <input
                type="text"
                name="fakeName"
                placeholder="Name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br /><br />

              <input
                type="email"
                name="fakeEmail2"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br /><br />

              <input
                type="password"
                name="fakePassword2"
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br /><br />
            </form>

            <button onClick={handleRegister}>Register</button>

            <button
              onClick={() => {
                setShowRegister(false);
                setName("");
                setEmail("");
                setPassword("");
              }}
              style={{ marginLeft: "10px" }}
            >
              Close
            </button>

            <p>
              Already have account?{" "}
              <span
                onClick={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
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

const boxStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
  textAlign: "center"
};

export default Welcome;
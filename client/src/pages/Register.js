import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:5000/api/auth/register",
        { 
          name,
           email, 
           password 
          });

      navigate("/login");
    } catch {
      alert("Register failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" onChange={e => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
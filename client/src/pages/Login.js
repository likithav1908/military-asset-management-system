import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/military_login_page.jpeg";

const Login = () => {
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("userRole", role);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia ',Georgia",
        color: "white",
        position: "relative",
      }}
    >
      {}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>

      {}
      <div
        style={{
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.6)",
          textAlign: "center",
          width: "300px",
        }}
      >
        <h2 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Login Panel
        </h2>
        <label style={{ fontSize: "1.5rem" }}>Select Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "15px 0",
            borderRadius: "5px",
            fontSize: "1.5rem",
            fontFamily : "Cambria"
          }}
        >
          <option>Admin</option>
          <option>Base Commander</option>
          <option>Logistics Officer</option>
        </select>
        <br />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            fontSize: "1.5rem",
            backgroundColor: "#28a745",
            border: "none",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            fontFamily : "initial"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

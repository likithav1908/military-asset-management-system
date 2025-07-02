import React from "react";
import { Link } from "react-router-dom";
import background from "../assets/welcome_background.jpg";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       <h1 style={{ fontSize: "50px", fontFamily: "'cursive'",  textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}> Military Asset Management System</h1>
      <p style={{ fontSize: "36px", fontFamily: "'Poppins'" , textShadow: "1px 1px 3px rgba(0,0,0,0.2)"}}>Welcome Commander!!!!</p>
      <p style={{ fontSize: "32px", fontFamily: "'Roboto Slab', serif", textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}>Track, Assign, and Monitor all your base assets here.</p>
      <Link to="/login">
        <button
          style={{
            padding: "16px 32px",
            marginTop: "30px",
            backgroundColor: "green",
            border: "none",
            borderRadius: "8px",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "'Orbitron', 'serif'",
            color: "aquamarine",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "0.3s"
          }}
        >
          Enter System
        </button>
      </Link>
    </div>
  );
};

export default Home;
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "15px", color: "#fff" }}>Home</Link>
      <Link to="/dashboard" style={{ marginRight: "15px", color: "#fff" }}>Dashboard</Link>
      <Link to="/add-purchase" style={{ marginRight: "15px", color: "#fff" }}>Add Purchase</Link>
      <Link to="/transfers" style={{ marginRight: "15px", color: "#fff" }}>Transfers</Link>
      <Link to="/assignments" style={{ marginRight: "15px", color: "#fff" }}>Assignments</Link>
      <Link to="/expenditures" style={{ marginRight: "15px", color: "#fff" }}>Expenditures</Link>
      <Link to="/login" style={{ marginRight: "15px", color: "#fff" }}>Login</Link>
    </nav>
  );
};

export default Navbar;
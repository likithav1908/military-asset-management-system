import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddPurchase from "./pages/AddPurchase";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";
import Expenditures from "./pages/Expenditures";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-purchase" element={<AddPurchase />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/expenditures" element={<Expenditures />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    base_id: "",
    asset_id: "",
    quantity: "",
    assigned_date: "",
    assigned_to: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignmentRes = await axios.get("http://localhost:5000/api/assignments");
        const baseRes = await axios.get("http://localhost:5000/api/bases");
        const assetRes = await axios.get("http://localhost:5000/api/assets");
        setAssignments(assignmentRes.data);
        setBases(baseRes.data);
        setAssets(assetRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/assignments", form);
      alert("Assignment recorded successfully");
      setForm({ base_id: "", asset_id: "", quantity: "", assigned_date: "", assigned_to: "" });
      const updatedAssignments = await axios.get("http://localhost:5000/api/assignments");
      setAssignments(updatedAssignments.data);
    } catch (err) {
      console.error("Assignment failed:", err);
      alert("Failed to assign asset");
    }
  };

  return (
    <div style={styles.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3349/3349384.png"
        alt="Assignments Icon"
        style={{ width: "70px", height: "70px", marginBottom: "10px" }}
      />
      <h2 style={styles.heading}> Assignments</h2>
      <p style={styles.subtitle}>Assign assets to individuals or departments.</p>

      <div style={styles.formBox}>
        <form onSubmit={handleSubmit} style={{ lineHeight: "2em" }}>
          <label style={styles.label}>Base:</label><br />
          <select name="base_id" value={form.base_id} onChange={handleChange} required style={styles.select}>
            <option value="">Select Base</option>
            {bases.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select><br />

          <label style={styles.label}>Asset:</label><br />
          <select name="asset_id" value={form.asset_id} onChange={handleChange} required style={styles.select}>
            <option value="">Select Asset</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select><br />

          <label style={styles.label}>Quantity:</label><br />
          <input type="number" name="quantity" min="1" value={form.quantity} onChange={handleChange} required style={styles.input} /><br />

          <label style={styles.label}>Assign Date:</label><br />
          <input type="date" name="assigned_date" value={form.assigned_date} onChange={handleChange} required style={styles.input} /><br />

          <label style={styles.label}>Assigned To:</label><br />
          <input type="text" name="assigned_to" value={form.assigned_to} onChange={handleChange} required style={styles.input} /><br />

          <button type="submit" style={styles.button}>Submit Assignment</button>
        </form>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ fontSize: "25px", color: "#2e3b4e" }}>Assignment Records</h3>
        {assignments.length === 0 ? (
          <p style={{ color: "#888" }}>No assignments recorded yet.</p>
        ) : (
          <ul style={{ paddingLeft: "20px" }}>
            {assignments.map((asg) => (
              <li key={asg.id} style={{ marginBottom: "8px", color: "#333" }}>
                {asg.quantity} of Asset #{asg.asset_id} assigned at Base #{asg.base_id} to {asg.assigned_to} on {asg.assigned_date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Segoe UI, sans-serif",
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f4f6fa",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  heading: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "#2e3b4e",
    textAlign: "center",
    marginTop: "3px"
  },
  subtitle: {
    fontSize: "30px",
    color: "#555",
    textAlign: "center",
    fontFamily: "-moz-initial",
    marginBottom: "25px"
  },
  formBox: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
    width: "fit-content",
    margin: "0 auto",
    marginBottom: "30px"
  },
  label: {
    fontWeight: "bold",
    fontSize: "23px",
    fontFamily: "-moz-initial",
    marginBottom: "5px",
    display: "block"
  },
  select: {
    width: "300px",
    padding: "8px",
    borderRadius: "6px",
    border: "2px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff",
    marginBottom: "15px"
  },
  input: {
    width: "290px",
    padding: "8px",
    borderRadius: "6px",
    border: "2px solid #ccc",
    fontSize: "14px",
    marginBottom: "15px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#0077cc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  }
};

export default Assignments;

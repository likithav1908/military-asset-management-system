import React, { useEffect, useState } from "react";
import axios from "axios";

const Expenditures = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    base_id: "",
    asset_id: "",
    quantity: "",
    expended_date: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseRes = await axios.get("http://localhost:5000/api/bases");
        const assetRes = await axios.get("http://localhost:5000/api/assets");
        setBases(baseRes.data);
        setAssets(assetRes.data);
      } catch (err) {
        console.error("Error loading dropdowns:", err);
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
      await axios.post("http://localhost:5000/api/expenditures", form);
      alert("Expenditure recorded successfully");
      setForm({ base_id: "", asset_id: "", quantity: "", expended_date: "" });
      const updated = await axios.get("http://localhost:5000/api/expenditures");
      setExpenditures(updated.data);
    } catch (err) {
      console.error("Expenditure failed:", err);
      alert("Failed to record expenditure");
    }
  };

  return (
    <div style={styles.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/9438/9438681.png"
        alt="Expenditure Icon"
        style={{ width: "70px", height: "70px", marginBottom: "4px" }}
      />
      <h2 style={styles.heading}>Expenditures</h2>
      <p style={styles.subtitle}>Track used or consumed assets.</p>

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
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            style={styles.input}
          /><br />

          <label style={styles.label}>Expenditure Date:</label><br />
          <input
            type="date"
            name="expended_date"
            value={form.expended_date}
            onChange={handleChange}
            required
            style={styles.input}
          /><br />

          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ fontSize: "30px", color: "#2e3b4e" }}>Expenditure Records</h3>
        {expenditures.length > 0 ? (
          <ul style={{ paddingLeft: "20px" }}>
            {expenditures.map((e) => (
              <li key={e.id} style={{ marginBottom: "8px", color: "#333" }}>
                {e.quantity} of Asset #{e.asset_id} expended from Base #{e.base_id} on {e.expended_date}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#888" , fontSize: "20px"}}>No expenditures recorded yet.</p>
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
    marginTop: "30px",
    marginBottom: "20px"
  },
  subtitle: {
    fontSize: "30px",
    color: "#555",
    textAlign: "center",
    fontFamily: "-moz-initial",
    marginBottom: "5px"
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

export default Expenditures;

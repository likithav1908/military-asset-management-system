import React, { useState, useEffect } from "react";
import axios from "axios";

const Transfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    asset_id: "",
    from_base_id: "",
    to_base_id: "",
    quantity: "",
    transfer_date: ""
  });

  useEffect(() => {
    const fetchBases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bases");
        setBases(res.data);
      } catch (err) {
        console.error("Failed to load bases:", err);
      }
    };

    const fetchAssets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/assets");
        setAssets(res.data);
      } catch (err) {
        console.error("Failed to load assets:", err);
      }
    };

    const fetchTransfers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/transfers");
        setTransfers(res.data);
      } catch (err) {
        console.error("Failed to load transfers:", err);
      }
    };

    fetchBases();
    fetchAssets();
    fetchTransfers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/transfers", form);
      alert("Transfer recorded successfully");
      setForm({ asset_id: "", from_base_id: "", to_base_id: "", quantity: "", transfer_date: "" });
      const updatedTransfers = await axios.get("http://localhost:5000/api/transfers");
      setTransfers(updatedTransfers.data);
    } catch (err) {
      console.error("Transfer failed:", err);
      alert("Failed to transfer asset");
    }
  };

  return (
    <div style={styles.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
        alt="Transfer Icon"
        style={{ width: "70px", height: "70px", marginBottom: "10px" }}
      />
      <h2 style={styles.heading}>Transfers</h2>
      <p style={styles.subtitle}>Transfer assets between bases.</p>

      <div style={styles.formBox}>
        <form onSubmit={handleSubmit} style={{ lineHeight: "2em" }}>
          <label style={styles.label}>Asset:</label><br />
          <select name="asset_id" value={form.asset_id} onChange={handleChange} required style={styles.select}>
            <option value="">Select Asset</option>
            {assets.length > 0 ? (
              assets.map(asset => <option key={asset.id} value={asset.id}>{asset.name}</option>)
            ) : (
              <option disabled>Loading Assets...</option>
            )}
          </select><br />

          <label style={styles.label}>From Base:</label><br />
          <select name="from_base_id" value={form.from_base_id} onChange={handleChange} required style={styles.select}>
            <option value="">Select From Base</option>
            {bases.length > 0 ? (
              bases.map(base => <option key={base.id} value={base.id}>{base.name}</option>)
            ) : (
              <option disabled>Loading Bases...</option>
            )}
          </select><br />

          <label style={styles.label}>To Base:</label><br />
          <select name="to_base_id" value={form.to_base_id} onChange={handleChange} required style={styles.select}>
            <option value="">Select To Base</option>
            {bases.length > 0 ? (
              bases.map(base => <option key={base.id} value={base.id}>{base.name}</option>)
            ) : (
              <option disabled>Loading Bases...</option>
            )}
          </select><br />

          <label style={styles.label}>Quantity:</label><br />
          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            required
            style={styles.input}
          /><br />

          <label style={styles.label}>Transfer Date:</label><br />
          <input
            name="transfer_date"
            type="date"
            value={form.transfer_date}
            onChange={handleChange}
            required
            style={styles.input}
          /><br />

          <button type="submit" style={styles.button}>Submit Transfer</button>
        </form>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ fontSize: "25px", color: "#2e3b4e" }}>Past Transfers</h3>
        {transfers.length === 0 ? (
          <p style={{ color: "#888" }}>No transfers recorded yet.</p>
        ) : (
          <ul style={{ paddingLeft: "20px" }}>
            {transfers.map(t => (
              <li key={t.id} style={{ marginBottom: "8px", color: "#333" }}>
                Asset #{t.asset_id} transferred from Base #{t.from_base_id} to Base #{t.to_base_id} - Qty: {t.quantity} on {t.transfer_date}
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
    marginTop: "1px"
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
    marginTop: "10px",
    marginBottom: "20px"
  },
  label: {
    fontWeight: "bold",
    fontSize: "23px",
    fontFamily: "-moz-initial",
    marginBottom: "10px",
    display: "block",
    marginTop: "10px"
  },
  select: {
    width: "300px",
    padding: "8px",
    borderRadius: "6px",
    border: "2px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff",
    marginBottom: "20px",
    marginTop: "1px",
  },
  input: {
    width: "290px",
    padding: "8px",
    borderRadius: "6px",
    border: "2px solid #ccc",
    fontSize: "14px",
    marginTop: "1px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#0077cc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px"
  }
};

export default Transfers;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPurchase = () => {
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    base_id: "",
    asset_id: "",
    quantity: "",
    purchase_date: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bases")
      .then((res) => setBases(res.data))
      .catch((err) => console.error("Error fetching bases:", err));

    axios.get("http://localhost:5000/api/assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.error("Error fetching assets:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.base_id || !form.asset_id || !form.quantity || !form.purchase_date) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/purchases", form);
      alert("Purchase added successfully");
      setForm({ base_id: "", asset_id: "", quantity: "", purchase_date: "" });
      setError(null);
    } catch (err) {
      console.error("Error submitting purchase:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Internal server error");
      alert("Failed to add purchase. Check console for details.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('purchase.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'UnifrakturCook', 'Caveat', cursive",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "40px",
          borderRadius: "15px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          fontSize: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "40px" }}>🛒 Add Purchase</h2>
        <form onSubmit={handleSubmit}>
          <label><strong>Base:</strong></label><br />
          <select
            name="base_id"
            value={form.base_id}
            onChange={handleChange}
            required
            style={inputStyle} 
          >
            <option value="">Select Base</option>
            {bases.map((base) => (
              <option key={base.id} value={base.id}>{base.name}</option>
            ))}
          </select>

          <label><strong>Asset:</strong></label><br />
          <select
            name="asset_id"
            value={form.asset_id}
            onChange={handleChange}
            required
            style={inputStyle} 
          >
            <option value="">Select Asset</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>

          <label><strong>Quantity:</strong></label><br />
          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            required
            style={inputBoxStyle} 
          />

          <label><strong>Purchase Date:</strong></label><br />
          <input
            name="purchase_date"
            type="date"
            value={form.purchase_date}
            onChange={handleChange}
            required
            style={inputBoxStyle} 
          />

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 30px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "18px",
                marginTop: "20px",
              }}
            >
              Submit
            </button>
          </div>

          {error && (
            <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
               {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};


const inputStyle = {
  width: "100%",
  padding: "14px",
  fontSize: "17px",
  borderRadius: "12px",
  border: "2px solid #ccc",
  marginBottom: "20px",
};

const inputBoxStyle = {
  width: "92%",
  padding: "15px",
  fontSize: "14px",
  borderRadius: "8px",
  border: "2px solid #ccc",
  marginBottom: "15px",
};

export default AddPurchase;

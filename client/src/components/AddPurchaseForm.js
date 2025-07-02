import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPurchaseForm = () => {
  const [form, setForm] = useState({
    base_id: '',
    asset_id: '',
    quantity: '',
    created_by: ''
  });

  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Fetch bases and assets
    axios.get("http://localhost:5000/api/bases")
      .then((res) => setBases(res.data))
      .catch((err) => console.error("Error loading bases", err));

    axios.get("http://localhost:5000/api/assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.error("Error loading assets", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/purchases", form);
      alert("✅ Purchase added!");
      setForm({ base_id: '', asset_id: '', quantity: '', created_by: '' });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding purchase");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "2rem" }}>
      <h2>Add New Purchase</h2>

      <select name="base_id" value={form.base_id} onChange={handleChange} required>
        <option value="">Select Base</option>
        {bases.map(base => (
          <option key={base.id} value={base.id}>{base.base_name}</option>
        ))}
      </select>
      <br /><br />

      <select name="asset_id" value={form.asset_id} onChange={handleChange} required>
        <option value="">Select Asset</option>
        {assets.map(asset => (
          <option key={asset.id} value={asset.id}>{asset.asset_name}</option>
        ))}
      </select>
      <br /><br />

      <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
      <br /><br />

      <input name="created_by" placeholder="User ID" value={form.created_by} onChange={handleChange} required />
      <br /><br />

      <button type="submit">Add Purchase</button>
    </form>
  );
};

export default AddPurchaseForm;

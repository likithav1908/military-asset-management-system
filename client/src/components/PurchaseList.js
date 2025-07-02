import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/purchases")
      .then((res) => setPurchases(res.data))
      .catch((err) => console.error("Error fetching purchases", err));
  }, []);

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Purchase History</h2>
      <ul>
        {purchases.map((p) => (
          <li key={p.id}>
            <strong>{p.asset_name}</strong> – {p.quantity} for <em>{p.base_name}</em> by {p.created_by} on {new Date(p.purchase_date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseList;

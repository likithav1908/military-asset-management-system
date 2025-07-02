import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [baseId, setBaseId] = useState("1");
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2025-12-31");
  const [equipmentFilter, setEquipmentFilter] = useState("All");
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [data, setData] = useState({
    openingBalance: 0,
    purchases: 0,
    transfersIn: 0,
    transfersOut: 0,
    netMovement: 0,
    assigned: 0,
    expended: 0,
    closingBalance: 0
  });

  // ✅ Load distinct equipment types on page load
  useEffect(() => {
    axios.get("http://localhost:5000/api/assets/types/distinct")
      .then((res) => setEquipmentTypes(res.data))
      .catch((err) => console.error("Failed to load equipment types", err));
  }, []);

  const fetchData = () => {
    // ✅ Match frontend query keys to backend expectations
    let url = `http://localhost:5000/api/dashboard?baseId=${baseId}&fromDate=${fromDate}&toDate=${toDate}`;

    if (equipmentFilter && equipmentFilter !== "All") {
      url += `&equipmentType=${equipmentFilter}`;
    }

    axios.get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert("Error loading dashboard data");
        console.error("Failed to load dashboard data", err);
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📊 Military Asset Dashboard</h2>
      <p>Logged in as: <strong>{localStorage.getItem("userRole")}</strong></p>

      <div style={{ marginBottom: "20px" }}>
        <label>Base ID: </label>
        <input value={baseId} onChange={(e) => setBaseId(e.target.value)} />

        <br /><br />

        <label>From: </label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

        <br /><br />

        <label>To: </label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        <br /><br />

        <label>Equipment Type: </label>
        <select value={equipmentFilter} onChange={(e) => setEquipmentFilter(e.target.value)}>
          <option value="All">All</option>
          {equipmentTypes.map((et, idx) => (
            <option key={idx} value={et.asset_type}>{et.asset_type}</option>
          ))}
        </select>

        <br /><br />

        <button onClick={fetchData}>Refresh</button>
      </div>

      <hr />

      <div>
        <p><strong>Opening Balance:</strong> {data.openingBalance}</p>
        <p><strong>Purchases:</strong> {data.purchases}</p>
        <p><strong>Transfers In:</strong> {data.transfersIn}</p>
        <p><strong>Transfers Out:</strong> {data.transfersOut}</p>
        <p><strong>Net Movement:</strong> {data.netMovement}</p>
        <p><strong>Assigned:</strong> {data.assigned}</p>
        <p><strong>Expended:</strong> {data.expended}</p>
        <p><strong>Closing Balance:</strong> {data.closingBalance}</p>
      </div>
    </div>
  );
};

export default Dashboard;

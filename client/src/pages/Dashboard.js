import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const role = localStorage.getItem("userRole");
  const [baseId, setBaseId] = useState("1");
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2025-12-31");
  const [equipmentType, setEquipmentType] = useState("All");
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);

  const fetchEquipmentTypes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assets/types/distinct");
      setEquipmentTypes(res.data.map((item) => item.asset_type));
    } catch (err) {
      console.error("Error fetching equipment types:", err);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        params: {
          base_id: baseId,
          from: fromDate,
          to: toDate,
          equipment_type: equipmentType,
        },
      });
      setMetrics(res.data);
      setError(null);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Error loading dashboard data");
    }
  };

  useEffect(() => {
    fetchEquipmentTypes();
    fetchDashboardData();
  }, [baseId, fromDate, toDate, equipmentType]);
  
  return (
  <div
    style={{
      backgroundImage: "url('/Dashboard_background.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "30px",
      color: "black",
      minHeight: "100vh",
      fontFamily: "'cursive', UnifrakturCook",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      fontSize: "23px"
    }}
  >
    <h2 style={{ fontSize: "45px", marginBottom: "10px" , marginTop: "5px"}}>MILITARY ASSET DASHBOARD</h2>
    <p style={{ fontSize: "40px", marginBottom: "30px", marginTop: "10px" }}>
      Logged in as: <strong>{role}</strong>
    </p>

    <div
      style={{
        marginTop: "20px",
        maxWidth: "300px",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <label style={{ fontWeight: "bold" }}>Base ID:</label>
      <input
        value={baseId}
        onChange={(e) => setBaseId(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          borderRadius: "15px",
          border: "2px solid #ccc",
          marginBottom: "15px",
          marginTop: "9px",
          fontFamily: "sans-serif"
        }}
      />

      <label style={{ fontWeight: "bold" }}>From Date:</label>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          borderRadius: "15px",
          border: "2px solid #ccc",
          marginBottom: "15px",
          marginTop: "9px",
         marginRight: "2px",
         fontFamily: "sans-serif"
         
        }}
      />
      <br></br>

      <label style={{ fontWeight: "bold" }}>To Date:</label>
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          borderRadius: "15px",
          border: "2px solid #ccc",
          marginBottom: "15px",
          marginTop: "9px",
          fontFamily: "sans-serif"
        }}
      />

      <label style={{ fontWeight: "bold" }}>Equipment Type:</label>
      <select
        value={equipmentType}
        onChange={(e) => setEquipmentType(e.target.value)}
        style={{
          width: "88%",
          padding: "10px",
          borderRadius: "15px",
          border: "2px solid #ccc",
          marginBottom: "20px",
          fontFamily: "sans-serif",
          marginTop: "9px"
        }}
      >
        <option value="All">All</option>
        {equipmentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <button
        onClick={fetchDashboardData}
        style={{
          padding: "15px 30px",
          backgroundColor: "black",
          color: "azure",
          border: "none",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "9px",
          fontFamily: "inherit",
          fontSize: "20px"
        }}
      >
        Refresh
      </button>
    </div>

    <div
      style={{
        marginTop: "40px",
        maxWidth: "200px",
        width: "50%",
        backgroundColor: "rgba(255,255,255,0.85)",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        color: "black",
        fontSize: "23px",
        fontWeight: "500",
        fontFamily: "serif"
      }}
    >
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : !metrics ? (
        <p>Loading...</p>
      ) : (
        <>
          <p><strong>Opening Balance:</strong> {metrics.openingBalance}</p>
          <p><strong>Purchases:</strong> {metrics.purchases}</p>
          <p><strong>Transfers In:</strong> {metrics.transfersIn}</p>
          <p><strong>Transfers Out:</strong> {metrics.transfersOut}</p>
          <p><strong>Net Movement:</strong> {metrics.netMovement}</p>
          <p><strong>Assigned:</strong> {metrics.assigned}</p>
          <p><strong>Expended:</strong> {metrics.expended}</p>
          <p><strong>Closing Balance:</strong> {metrics.closingBalance}</p>
        </>
      )}
    </div>
  </div>
);

};

export default Dashboard;

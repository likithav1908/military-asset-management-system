const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM expenditures ORDER BY expended_date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching expenditures:", err);
    res.status(500).json({ error: "Failed to fetch expenditures" });
  }
});

router.post("/", async (req, res) => {
  const { asset_id, base_id, quantity, expended_date } = req.body;
  if (!asset_id || !base_id || !quantity || !expended_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const insertQuery = `
      INSERT INTO expenditures (asset_id, base_id, quantity, expended_date)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const result = await db.query(insertQuery, [asset_id, base_id, quantity, expended_date]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding expenditure:", err);
    res.status(500).json({ error: "Failed to add expenditure" });
  }
});

module.exports = router;

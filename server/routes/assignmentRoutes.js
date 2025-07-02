const express = require("express");
const router = express.Router();
const { createAssignment, getAssignments } = require("../controllers/assignmentController");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM assignments ORDER BY assigned_date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

router.post("/", async (req, res) => {
  const { base_id, asset_id, quantity, assigned_date, assigned_to } = req.body;
  try {
    await db.query(
      "INSERT INTO assignments (base_id, asset_id, quantity, assigned_date, assigned_to) VALUES ($1, $2, $3, $4, $5)",
      [base_id, asset_id, quantity, assigned_date, assigned_to]
    );
    res.status(201).json({ message: "Assignment recorded successfully" });
  } catch (err) {
    console.error("Error inserting assignment:", err);
    res.status(500).json({ error: "Failed to insert assignment" });
  }
});

module.exports = router;

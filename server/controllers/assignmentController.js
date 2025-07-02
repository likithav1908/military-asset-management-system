const db = require("../db");

exports.createAssignment = async (req, res) => {
  const { base_id, asset_id, quantity, created_by, assigned_date } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO assignments 
        (base_id, asset_id, quantity, created_by, assigned_date) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [base_id, asset_id, quantity, created_by, assigned_date]
    );

    res.status(201).json({
      message: "Assignment recorded successfully",
      assignment: result.rows[0],
    });
  } catch (error) {
    console.error("Assignment Insert Error:", error); // <-- shows full error
    res.status(500).json({ error: "Failed to insert assignment" });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        a.id, a.quantity, a.assigned_date,
        b.name AS base_name,
        s.name AS asset_name,
        u.name AS created_by
      FROM assignments a
      JOIN bases b ON a.base_id = b.id
      JOIN assets s ON a.asset_id = s.id
      JOIN users u ON a.created_by = u.id
      ORDER BY a.assigned_date DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

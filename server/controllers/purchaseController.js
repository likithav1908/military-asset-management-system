const pool = require("../db");

exports.createPurchase = async (req, res) => {
  const { base_id, asset_id, quantity, created_by, purchase_date } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO purchases (base_id, asset_id, quantity, created_by, purchase_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [base_id, asset_id, quantity, created_by, purchase_date]
    );

    res.status(201).json({
      message: "Purchase recorded successfully",
      purchase: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating purchase:", error.message);
    res.status(500).json({ error: "Failed to record purchase" });
  }
};

exports.getPurchases = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id, p.quantity, p.purchase_date,
        b.name AS base_name,
        a.name AS asset_name,
        u.name AS created_by
      FROM purchases p
      JOIN bases b ON p.base_id = b.id
      JOIN assets a ON p.asset_id = a.id
      LEFT JOIN users u ON p.created_by = u.id
      ORDER BY p.purchase_date DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching purchases:", error.message);
    res.status(500).json({ error: "Failed to fetch purchases" });
  }
};

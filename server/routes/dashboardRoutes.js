const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get("/", async (req, res) => {
  try {
    const { base_id, from, to, equipment_type } = req.query;
    if (!base_id || !from || !to) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const isAll = !equipment_type || equipment_type === "All";
    const typeClause = isAll ? "" : "AND a.asset_type = $4";

    const valuesFor3 = isAll
      ? [base_id, from, to]
      : [base_id, from, to, equipment_type];

    const valuesFor1 = isAll
      ? [base_id]
      : [base_id, equipment_type];

   
    const purchaseQuery = `
      SELECT SUM(p.quantity) as total
      FROM purchases p
      JOIN assets a ON p.asset_id = a.id
      WHERE p.base_id = $1 AND p.purchase_date BETWEEN $2 AND $3
      ${isAll ? "" : "AND a.asset_type = $4"}
    `;
    const purchaseResult = await db.query(purchaseQuery, valuesFor3);
    const purchases = parseInt(purchaseResult.rows[0].total) || 0;

    const transferInQuery = `
      SELECT SUM(t.quantity) as total
      FROM transfers t
      JOIN assets a ON t.asset_id = a.id
      WHERE t.to_base_id = $1 AND t.transfer_date BETWEEN $2 AND $3
      ${isAll ? "" : "AND a.asset_type = $4"}
    `;
    const transferInResult = await db.query(transferInQuery, valuesFor3);
    const transfersIn = parseInt(transferInResult.rows[0].total) || 0;

    const transferOutQuery = `
      SELECT SUM(t.quantity) as total
      FROM transfers t
      JOIN assets a ON t.asset_id = a.id
      WHERE t.from_base_id = $1 AND t.transfer_date BETWEEN $2 AND $3
      ${isAll ? "" : "AND a.asset_type = $4"}
    `;
    const transferOutResult = await db.query(transferOutQuery, valuesFor3);
    const transfersOut = parseInt(transferOutResult.rows[0].total) || 0;

    const assignedQuery = `
      SELECT SUM(aq.quantity) as total
      FROM assignments aq
      JOIN assets a ON aq.asset_id = a.id
      WHERE aq.base_id = $1
      ${isAll ? "" : "AND a.asset_type = $2"}
    `;
    const assignedResult = await db.query(assignedQuery, valuesFor1);
    const assigned = parseInt(assignedResult.rows[0].total) || 0;

    const expendedQuery = `
      SELECT SUM(e.quantity) as total
      FROM expenditures e
      JOIN assets a ON e.asset_id = a.id
      WHERE e.base_id = $1 AND e.expended_date BETWEEN $2 AND $3
      ${isAll ? "" : "AND a.asset_type = $4"}
    `;
    const expendedResult = await db.query(expendedQuery, valuesFor3);
    const expended = parseInt(expendedResult.rows[0].total) || 0;

    const openingBalance = 0;
    const netMovement = purchases + transfersIn - transfersOut;
    const closingBalance = openingBalance + netMovement - assigned - expended;

    res.json({
      openingBalance,
      purchases,
      transfersIn,
      transfersOut,
      assigned,
      expended,
      netMovement,
      closingBalance
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM bases');
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bases:", err);
    res.status(500).json({ error: "Failed to fetch bases" });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM assets');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});


router.get('/types/distinct', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT DISTINCT asset_type FROM assets WHERE asset_type IS NOT NULL
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching equipment types:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
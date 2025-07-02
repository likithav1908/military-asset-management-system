const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { asset_id, from_base_id, to_base_id, quantity, transfer_date } = req.body;
  try {
    await db.query(
      `INSERT INTO transfers (asset_id, from_base_id, to_base_id, quantity, transfer_date)
       VALUES ($1, $2, $3, $4, $5)`,
      [asset_id, from_base_id, to_base_id, quantity, transfer_date]
    );
    res.status(201).json({ message: 'Transfer recorded successfully' });
  } catch (err) {
    console.error('Error adding transfer:', err);
    res.status(500).json({ error: 'Failed to record transfer' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM transfers');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching transfers:', err);
    res.status(500).json({ error: 'Failed to fetch transfers' });
  }
});

module.exports = router;

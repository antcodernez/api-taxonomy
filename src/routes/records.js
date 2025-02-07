import express from 'express';
import Record from '../models/records.js';  // Adjust the path as needed

const router = express.Router();

// GET all records
router.get('/records', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST a new record
router.post('/records', async (req, res) => {
  const { commonName, scientificName, family, order, description } = req.body;
  
  try {
    const newRecord = new Record({ commonName, scientificName, family, order, description });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT to update a record by ID
router.put('/records/:id', async (req, res) => {
  const { id } = req.params;
  const { commonName, scientificName, family, order, description } = req.body;
  
  try {
    const updatedRecord = await Record.findByIdAndUpdate(id, { commonName, scientificName, family, order, description }, { new: true });
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE a record by ID
router.delete('/records/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await Record.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

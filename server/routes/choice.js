const express = require('express');
const router = express.Router();
const Choice = require('../server/models/Choice');

// Create a new choice
router.post('/choices', async (req, res) => {
  try {
    const choice = await Choice.create(req.body);
    res.status(201).json(choice);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all choices
router.get('/choices', async (req, res) => {
  try {
    const choices = await Choice.find();
    res.status(200).json(choices);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific choice by ID
router.get('/choices/:id', async (req, res) => {
  try {
    const choice = await Choice.findById(req.params.id);
    if (!choice) {
      res.status(404).json({ error: 'Choice not found' });
      return;
    }
    res.status(200).json(choice);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a choice by ID
router.put('/choices/:id', async (req, res) => {
  try {
    const choice = await Choice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!choice) {
      res.status(404).json({ error: 'Choice not found' });
      return;
    }
    res.status(200).json(choice);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a choice by ID
router.delete('/choices/:id', async (req, res) => {
  try {
    const choice = await Choice.findByIdAndDelete(req.params.id);
    if (!choice) {
      res.status(404).json({ error: 'Choice not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

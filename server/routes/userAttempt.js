// userAttemptRoutes.js

const express = require('express');
const router = express.Router();
const UserAttempt = require('../models/userAttempt');

// Create UserAttempt
router.post('/userAttempts', async (req, res) => {
  try {
    const userAttempt = new UserAttempt(req.body);
    await userAttempt.save();
    res.status(201).json(userAttempt);
  } catch (error) {
    console.error('Error creating userAttempt:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all UserAttempts
router.get('/userAttempts', async (req, res) => {
  try {
    const userAttempts = await UserAttempt.find();
    res.json(userAttempts);
  } catch (error) {
    console.error('Error getting userAttempts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get UserAttempt by ID
router.get('/userAttempts/:id', async (req, res) => {
  try {
    const userAttempt = await UserAttempt.findById(req.params.id);
    if (!userAttempt) {
      return res.status(404).json({ error: 'UserAttempt not found' });
    }
    res.json(userAttempt);
  } catch (error) {
    console.error('Error getting userAttempt by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update UserAttempt by ID
router.put('/userAttempts/:id', async (req, res) => {
  try {
    const userAttempt = await UserAttempt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userAttempt) {
      return res.status(404).json({ error: 'UserAttempt not found' });
    }
    res.json(userAttempt);
  } catch (error) {
    console.error('Error updating userAttempt by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete UserAttempt by ID
router.delete('/userAttempts/:id', async (req, res) => {
  try {
    const userAttempt = await UserAttempt.findByIdAndRemove(req.params.id);
    if (!userAttempt) {
      return res.status(404).json({ error: 'UserAttempt not found' });
    }
    res.json({ message: 'UserAttempt deleted successfully' });
  } catch (error) {
    console.error('Error deleting userAttempt by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

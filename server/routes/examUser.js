// examUserRoutes.js

const express = require('express');
const router = express.Router();
const ExamUser = require('../models/examUser');

// Create ExamUser
router.post('/examUsers', async (req, res) => {
  try {
    const examUser = new ExamUser(req.body);
    await examUser.save();
    res.status(201).json(examUser);
  } catch (error) {
    console.error('Error creating examUser:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all ExamUsers
router.get('/examUsers', async (req, res) => {
  try {
    const examUsers = await ExamUser.find();
    res.json(examUsers);
  } catch (error) {
    console.error('Error getting examUsers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get ExamUser by ID
router.get('/examUsers/:id', async (req, res) => {
  try {
    const examUser = await ExamUser.findById(req.params.id);
    if (!examUser) {
      return res.status(404).json({ error: 'ExamUser not found' });
    }
    res.json(examUser);
  } catch (error) {
    console.error('Error getting examUser by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update ExamUser by ID
router.put('/examUsers/:id', async (req, res) => {
  try {
    const examUser = await ExamUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!examUser) {
      return res.status(404).json({ error: 'ExamUser not found' });
    }
    res.json(examUser);
  } catch (error) {
    console.error('Error updating examUser by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete ExamUser by ID
router.delete('/examUsers/:id', async (req, res) => {
  try {
    const examUser = await ExamUser.findByIdAndRemove(req.params.id);
    if (!examUser) {
      return res.status(404).json({ error: 'ExamUser not found' });
    }
    res.json({ message: 'ExamUser deleted successfully' });
  } catch (error) {
    console.error('Error deleting examUser by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

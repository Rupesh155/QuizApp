// examRoutes.js

const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');

// Create Exam
router.post('/exams', async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all Exams
router.get('/exams', async (req, res) => {
    try {
      const exams = await Exam.find().populate('quiz_id');
      res.json(exams);
    } catch (error) {
      console.error('Error getting exams:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Get Exam by ID
router.get('/exams/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate('quiz_id');
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json(exam);
  } catch (error) {
    console.error('Error getting exam by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Exam by ID
router.put('/exams/:id', async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json(exam);
  } catch (error) {
    console.error('Error updating exam by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Exam by ID
router.delete('/exams/:id', async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error('Error deleting exam by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

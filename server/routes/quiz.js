const express = require('express');
const router = express.Router();
const Quiz = require('../server/models/quiz');

// Create a new quiz
router.post('/quizzes', async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all quizzes
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific quiz by ID
router.get('/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a quiz by ID
router.put('/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a quiz by ID
router.delete('/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/quizQuestion');

// Create a quiz question
router.post('/quiz-questions', async (req, res) => {
  try {
    const { quizId, questionId } = req.body;
    const quizQuestion = new QuizQuestion({ quizId, questionId });
    await quizQuestion.save();
    res.status(201).json(quizQuestion);
  } catch (error) {
    console.error('Error creating quiz question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all questions for a specific quizId
router.get('/quiz-questions/:quizId', async (req, res) => {
  try {
    const quizId = req.params.quizId;
    console.log(quizId,"quizID");
    const quizQuestions = await QuizQuestion.find({ quizId }).populate('questionId');
    // console.log(quizQuestions,"quesQUESTIONS");
    res.json(quizQuestions);
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a quiz question
router.put('/quiz-questions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { quizId, questionId } = req.body;
    const quizQuestion = await QuizQuestion.findByIdAndUpdate(id, { quizId, questionId }, { new: true });
    res.json(quizQuestion);
  } catch (error) {
    console.error('Error updating quiz question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a quiz question
router.delete('/quiz-questions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await QuizQuestion.findByIdAndRemove(id);
    res.json({ message: 'Quiz question deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;





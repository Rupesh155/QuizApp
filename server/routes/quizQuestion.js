const express = require('express');
const router = express.Router();
const QuizQuestion = require('../server/models/quizQuestion');

// Create a new quiz-question link
router.post('/quiz-questions', async (req, res) => {
  try {
    const quizQuestion = await QuizQuestion.create(req.body);
    res.status(201).json(quizQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all quiz-question links
router.get('/quiz-questions', async (req, res) => {
  try {
    const quizQuestions = await QuizQuestion.find();
    res.status(200).json(quizQuestions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get quiz-question links by quiz ID
router.get('/quiz-questions/by-quiz/:quizId', async (req, res) => {
  try {
    const quizQuestions = await QuizQuestion.find({ quizId: req.params.quizId });
    res.status(200).json(quizQuestions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a quiz-question link by quiz ID and question ID
router.delete('/quiz-questions/:quizId/:questionId', async (req, res) => {
  try {
    const quizQuestion = await QuizQuestion.findOneAndDelete({
      quizId: req.params.quizId,
      questionId: req.params.questionId,
    });
    if (!quizQuestion) {
      res.status(404).json({ error: 'Quiz-Question link not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const QuestionChoice = require('../models/questionChoice');

// Create a new question-choice link
router.post('/question-choices', async (req, res) => {
  try {
    const questionChoice = await QuestionChoice.create(req.body);
    res.status(201).json(questionChoice);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all question-choice links
router.get('/question-choices', async (req, res) => {
  try {
    const questionChoices = await QuestionChoice.find();
    res.status(200).json(questionChoices);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get question-choice links by question ID
router.get('/question-choices/:questionId', async (req, res) => {
  try {
    const questionChoices = await QuestionChoice.find({ questionId: req.params.questionId }).populate('choiceId');
    // console.log(questionChoices,"quesabbhiiiiii");
    res.status(200).json(questionChoices);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a question-choice link by question ID and choice ID
router.delete('/question-choices/:questionId/:choiceId', async (req, res) => {
  try {
    const questionChoice = await QuestionChoice.findOneAndDelete({
      questionId: req.params.questionId,
      choiceId: req.params.choiceId,
    });
    if (!questionChoice) {
      res.status(404).json({ error: 'Question-Choice link not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

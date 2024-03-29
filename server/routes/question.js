const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const QuizQuestion = require('../models/quizQuestion');


// Create a new question
router.post('/questions', async (req, res) => {
  try {
    const question = await Question.create(req.body);
    let questionId=question._id
    let quizId=req.body.quizId
    const quizQuestion =   await QuizQuestion.create({ quizId, questionId });


    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific question by ID
router.get('/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a question by ID
router.put('/questions/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a question by ID
router.delete('/questions/:id', async (req, res) => {
  // console.log(req.body);
  let quizId=req.body.quizId
  // console.log(quizId,"quizId");
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
      let DeleteQuiz=  await QuizQuestion.findOneAndDelete({quizId,questionId:req.params.id})
      console.log(DeleteQuiz,"deletequizz");
    // await QuizQuestion.findByIdAndRemove(id);
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

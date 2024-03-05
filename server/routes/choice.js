const express = require('express');
const router = express.Router();
const Choice = require('../models/choice');
const QuestionChoice = require('../models/questionChoice');
// Create a new choice
router.post('/choices', async (req, res) => {
  // console.log(req.body,"boyddd");
  try {
    const choice = await Choice.create(req.body);
    const choiceId = choice._id;
    const questionId = req.body.questionId;
    const isCorrect = req.body.isCorrect;
    // console.log(isCorrect, "quesID");
    const QCoice = await QuestionChoice.create({ choiceId, isCorrect, questionId });
    // console.log(QCoice);
    res.status(201).json(choice);
  } catch (error) {
    console.error('Error creating choice:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});


// Get all choices
router.get('/choices', async (req, res) => {
  try {
    // Fetch all choices and populate the 'questionChoice' field to include the 'isCorrect' option
    const choices = await QuestionChoice.find().populate('choiceId');
// console.log(choices,"choiceee");
     
    // If no choices are found, return a 404 error
    if (!choices) {
      return res.status(404).json({ error: 'Choices not found' });
    }

    // Otherwise, return the choices with their corresponding 'isCorrect' options
    res.status(200).json(choices);
  } catch (error) {
    // If an error occurs, return a 500 error
    console.error('Error fetching choices:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific choice by ID
router.get('/choices/:id', async (req, res) => {
  // console.log(req.params,"peeee");

  try {
    // const choice = await Choice.findById(req.params.id);
    const choice = await Choice.findById(req.params.id);
    // console.log(choice,"choice");
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
  console.log(req.body,"boy");
  try {
    // Update the choice
    const choice = await Choice.findByIdAndUpdate(req.params.id, { $set: { title: req.body.choice.title } }, { new: true });
    

    if (!choice) {
      return res.status(404).json({ error: 'Choice not found' });
    }

    // Update the corresponding QuestionChoice
    const questionChoice = await QuestionChoice.findOneAndUpdate({ choiceId: req.params.id }, { $set: { isCorrect: req.body.choice.isCorrect } }, { new: true }).populate('choiceId');
    console.log(questionChoice,"Updatedddd data");

    if (!questionChoice) {
      return res.status(404).json({ error: 'QuesionChoice not found' });
    }

    res.status(200).json(choice);
  } catch (error) {
    console.error('Error updating choice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete a choice by ID
router.delete('/choices/:id', async (req, res) => {

  try {
    const choice = await Choice.findByIdAndDelete(req.params.id);
    const questionChoice = await QuestionChoice.findOneAndDelete({
      questionId: req.body.questionsId,
      choiceId: req.params.id,
    });
                  
    if (!choice && !questionChoice) {
      res.status(404).json({ error: 'Choice not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

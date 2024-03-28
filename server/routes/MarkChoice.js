const express = require('express');
const router = express.Router();
     let MarkChoice=    require('../models/markChoice');
     router.post('/markChoices', async (req, res) => {
      try {
        const markChoicesData = req.body;
        const markChoices = [];
    
        // Iterate over each object in the array and create a new MarkChoice document
        for (const markChoiceData of markChoicesData) {
          const { questionId, choiceId, examId, isCorrect } = markChoiceData;
          const markChoice = new MarkChoice({
            questionId: questionId,
            choiceId: choiceId,
            examId: examId,
            isCorrect: isCorrect
          });
          // Save the MarkChoice document
          await markChoice.save();
          markChoices.push(markChoice);
        }
    
        console.log('Successfully saved markChoices:', markChoices);
        res.status(201).json(markChoices);
      } catch (error) {
        console.error('Failed to create markChoices:', error);
        res.status(500).json({ error: 'Failed to create markChoices' });
      }
    });
    
    

  router.get('/markChoices', async (req, res) => {
    try {
      const markChoices = await MarkChoice.find();
      res.status(200).json(markChoices);
    } catch (error) {
      console.error('Failed to fetch markChoices:', error);
      res.status(500).json({ error: 'Failed to fetch markChoices' });
    }
  });



  router.get('/markChoices/:examId/:userId', async (req, res) => {
    try {
      const { examId, userId } = req.params;
      const markChoices = await MarkChoice.find({ examId, userId });
      res.status(200).json(markChoices);
    } catch (error) {
      console.error('Failed to fetch markChoices:', error);
      res.status(500).json({ error: 'Failed to fetch markChoices' });
    }
  });
  


  module.exports=router
  
  
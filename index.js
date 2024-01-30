let express = require('express')
let app = express()
var cors = require('cors')

const Quiz = require('./models/quiz');
const Question = require('./models/question');
const QuizQuestion = require('./models/quizQuestion');
const Choice = require('./models/Choice');
const QuestionChoice = require('./models/questionChoice');
const User = require('./models/User');
const UserAttempt = require('./models/userAttempt');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/quizApp').then(() => {
    console.log('db connected ');
}).catch((err) => {
    console.log(err);
})



// Create a new quiz
app.post('/api/quizzes', async (req, res) => {
    try {
      const quiz = await Quiz.create(req.body);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get all quizzes
  app.get('/api/quizzes', async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get a specific quiz by ID
  app.get('/api/quizzes/:id', async (req, res) => {
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
  app.put('/api/quizzes/:id', async (req, res) => {
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
  app.delete('/api/quizzes/:id', async (req, res) => {
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
  


















app.listen(4000, () => {
    console.log('server running on port no 4000');
})






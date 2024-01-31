// models/question.model.js

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true
    
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

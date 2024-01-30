const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
});

const QuizQuestion = mongoose.model('QuizQuestion', quizQuestionSchema);

module.exports = QuizQuestion;

const mongoose = require('mongoose');
const questionChoiceSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  choiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Choice',
    required: true,
    
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

const QuestionChoice = mongoose.model('QuestionChoice', questionChoiceSchema);
module.exports = QuestionChoice;

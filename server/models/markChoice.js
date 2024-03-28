const mongoose = require('mongoose');

const markChoiceSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    // required: true
  },
  choiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Choice',
    // required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    // required: true
  },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  isCorrect: {
    type: Boolean,
    // required: true
  }
});

const MarkChoice = mongoose.model('MarkChoice', markChoiceSchema);

module.exports = MarkChoice;

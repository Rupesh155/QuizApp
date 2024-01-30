const mongoose = require('mongoose');

const userAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  markedChoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Choice',
  },
});

const UserAttempt = mongoose.model('UserAttempt', userAttemptSchema);

module.exports = UserAttempt;

// userAttemptSchema.js

const mongoose = require('mongoose');

const userAttemptSchema = new mongoose.Schema({
  exam_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamUser', required: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  marked_choices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Choice' }]
});

const UserAttempt = mongoose.model('UserAttempt', userAttemptSchema);

module.exports = UserAttempt;

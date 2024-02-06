// examUserSchema.js

const mongoose = require('mongoose');

const examUserSchema = new mongoose.Schema({
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const ExamUser = mongoose.model('ExamUser', examUserSchema);

module.exports = ExamUser;

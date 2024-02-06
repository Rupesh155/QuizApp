// examSchema.js

const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

const mongoose = require('mongoose');

const choiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
   
  
  },
  questionChoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionChoice',
  },
});

const Choice = mongoose.model('Choice', choiceSchema);

module.exports = Choice;

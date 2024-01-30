const mongoose = require('mongoose');

const choiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Choice = mongoose.model('Choice', choiceSchema);

module.exports = Choice;

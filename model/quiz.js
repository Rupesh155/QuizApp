// models/question.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctOption: {
        type: Number,
        required: true,
    },
});



let  Question=  mongoose.model('Question', questionSchema);
module.exports = Question

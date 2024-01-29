let express=   require('express')  
let app=  express()
var cors = require('cors')
   let Question=  require('./model/quiz')
   let User=require('./model/user')
   app.use(express.urlencoded({ extended: true }));
   app.use(express.json())
   app.use(cors())
let mongoose=  require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/quizApp').then(()=>{
    console.log('db connected ');
}).catch((err)=>{
    console.log(err);
})

// Get all questions
app.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new question
app.post('/', async (req, res) => {
    console.log(req.body,"ques");
    const question = new Question({
        question: req.body.question,
        options: req.body.options,
        correctOption: req.body.correctOption,
    });

    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Get a specific question by ID
app.get('/:id',  getQuestion,  (req, res) => {
    res.json(res.question);
});


// Update a question by ID
app.patch('/:id',   getQuestion,async (req, res) => {
    if (req.body.question != null) {
        res.question.question = req.body.question;
    }
    if (req.body.options != null) {
        res.question.options = req.body.options;
    }
    if (req.body.correctOption != null) {
        res.question.correctOption = req.body.correctOption;
    }

    try {
        const updatedQuestion = await res.question.save();
        res.json(updatedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Delete a question by ID
app.delete('/:id', getQuestion, async (req, res) => {
    try {
        await res.question.remove();
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



async function getQuestion(req, res, next) {
    let question;
    try {
        question = await Question.findById(req.params.id);
        if (question == null) {
            return res.status(404).json({ message: 'Cannot find question' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.question = question;
    next();
}





app.listen(4000,()=>{
    console.log('server running on port no 4000');
})






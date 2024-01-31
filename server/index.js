let express = require('express')
let app = express()
var cors = require('cors')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/quizApp').then(() => {
    console.log('db connected ');
}).catch((err) => {
    console.log(err);
})

const quizRouter = require('./routes/quiz');
const questionRouter = require('./routes/question');
const choiceRouter= require('./routes/choice');
const quizQuestionRouter = require('./routes/quizQuestion');
const userRouter = require('./routes/user');
const questionChoicesRouter = require('./routes/questionChoice');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
// Use your routers
app.use('/api', quizRouter);
app.use('/api', questionRouter);
app.use('/api', questionRouter);
app.use('/api', choiceRouter);
app.use('/api', quizQuestionRouter);
app.use('/api', userRouter);
app.use('/api', questionChoicesRouter);
app.use('/api', loginRouter);
app.use('/api', signupRouter);
app.listen(4000, () => {
    console.log('server running on port no 4000');
})






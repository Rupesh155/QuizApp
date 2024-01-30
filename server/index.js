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



app.listen(4000, () => {
    console.log('server running on port no 4000');
})






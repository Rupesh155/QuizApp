const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    passWord:{
        type:String,
        require:true

    }
})
const User=mongoose.model('User',userSchema)
module.exports=User

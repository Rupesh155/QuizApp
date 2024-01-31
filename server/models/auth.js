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
const Auth=mongoose.model('Auth',userSchema)
module.exports=Auth
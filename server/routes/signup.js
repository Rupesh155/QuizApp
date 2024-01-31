
const express = require('express');
const router = express.Router();
const Auth = require('../models/auth');

 let bcrypt=  require('bcrypt')

router.post('/register',async(req,res)=>{
    const user=req.body
    console.log(req.body,"akansha")
    const  Email=await Auth.findOne({email:user.email})
    if(Email){
        res.send('user is already register in  our dataBase')
    } 
    else{
        console.log(req.body.passWord);
            user.passWord= await bcrypt.hash(req.body.passWord,10)
            console.log(req.body.passWord,"rrr")
            const dbUser=new Auth({
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email.toLowerCase(),
                passWord:user.passWord          
            })
             await dbUser.save()
            res.send({messge:"done"})

    }

})
module.exports = router
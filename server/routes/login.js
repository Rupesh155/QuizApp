
const express = require('express');
const router = express.Router();
const Auth = require('../models/auth');
let bcrypt=  require('bcrypt')
   let   generateAuthToken=  require('../jwtTokenGenerate')
router.post('/login', async(req,res)=>{
    const userInfo=req.body
    let userData
    try{

         userData= await Auth.findOne({email:userInfo.email})
    }
    catch(err){
        console.log(err,"err")

    }
    if(!userData){
        res.status(401).send({msg:"signUp kiya tune ???"})
    }
     const validPassword=  await bcrypt.compare(userInfo.passWord,userData.passWord).catch((err)=>{
        console.log(err,"err while matching passoword")
        res.status(500).send({msg:"Internal server err"})
     })
     if(!validPassword){
        res.send({msg:"Invalid password"})
     }
    //  delete userDataObject.passWord
       const token = generateAuthToken(userData)
       res.status(200).send({                           
        data:{
            token:token,userData
        },
        msg:"sab kuch theek hai done hai"
       })

})
module.exports = router
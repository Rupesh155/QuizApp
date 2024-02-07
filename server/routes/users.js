
const express = require('express');
const router = express.Router();
const User = require('../models/users');

 let bcrypt=  require('bcrypt')

router.post('/users',async(req,res)=>{
    const user=req.body
    // console.log(req.body,"akansha")
    const  Email=await User.findOne({email:user.email})
    if(Email){
        res.send('user is already register in  our dataBase')
    } 
    else{
        // console.log(req.body.passWord);
            user.passWord= await bcrypt.hash(req.body.passWord,10)
            const dbUser=new User({
                name:user.name,
                email:user.email.toLowerCase(),
                passWord:user.passWord          
            })
             await dbUser.save()
            res.send({messge:"done"})

    }

})



router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router
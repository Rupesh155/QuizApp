// const userSchema=require('./models/users');
const jwt=require('jsonwebtoken')
// const  generateAuthToken=function(data){
//     data=JSON.stringify(data)
//     const token=jwt.sign(data,"ERUHIERHIDNFKLFUHIKSFNIFEIFIKFNHFFHSEIGHIIHF",{
   
//     });
//     return token
// }
// module.exports=generateAuthToken;
const generateAuthToken=function(data){
    data=JSON.stringify(data)
  const token = jwt.sign(data,"ERUFHWIUFHHISDJNCEFHIWEFHIWEFHIWEHFIWEH")
  return token
    

}
module.exports=generateAuthToken
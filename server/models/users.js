// userSchema.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passWord:{type:String,required:true},
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

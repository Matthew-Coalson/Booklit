const mongoose = require('mongoose');
//FIX THIS GARBAGE <3
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String
 }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);
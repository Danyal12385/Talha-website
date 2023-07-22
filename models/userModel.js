const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
})

module.exports = mongoose.model('User', userSchema)
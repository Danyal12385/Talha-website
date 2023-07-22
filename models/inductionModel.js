const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var inductionSchema = new Schema({
    name: String,
    cnic: String,
    phone: String,
    region: String,
    address: String,
})

module.exports = mongoose.model('Induction', inductionSchema)
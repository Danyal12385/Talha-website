const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sponsorSchema = new Schema({
    name: String,
    cnic: String,
    phone: String,
    address: String,
    region: String,
    event: String,
})

module.exports = mongoose.model('Sponsor', sponsorSchema)
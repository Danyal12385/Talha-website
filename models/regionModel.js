const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var regionSchema = new Schema({
    name: String,
    message: String,
    phone: String,
    email: String,
    account: String,
    accountType: String,
    raId: String,
    adminImage: String,
    teamImage: String,
    induction: {
        type: String,
        default: 1
    }
})

module.exports = mongoose.model('Region', regionSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var transactionSchema = new Schema({
    sessionId: String,
    email: String,
    amount: String,
    status: String,
})

module.exports = mongoose.model('Transaction', transactionSchema)
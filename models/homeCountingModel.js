const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var homeCountingSchema = new Schema({
    ration: String,
    education: String,
    orphanage: String,
    medical: String,
    food: String
})

module.exports = mongoose.model('HomeCounting', homeCountingSchema)
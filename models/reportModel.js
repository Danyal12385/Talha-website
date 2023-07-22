const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reportSchema = new Schema({
    image: String,
    regionId: String
})

module.exports = mongoose.model('Report', reportSchema)
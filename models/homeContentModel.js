const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var homeContentSchema = new Schema({
    title: String,
    description: String,
    media: String,
    useMedia: String
})

module.exports = mongoose.model('HomeContent', homeContentSchema)
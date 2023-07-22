const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventchema = new Schema({
  title: String,
  description: String,
  image: String,
  regionId: String,
  createdAt: String
});

const Event = mongoose.model('Event', eventchema);

module.exports = Event;
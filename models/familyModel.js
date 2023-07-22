const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
  name: String,
  headName: String,
  faterName: String,
  cnic: Number,
  phone: Number,
  address: String,
  house: String,
  region: String,
  income: String,
  feeCase: String,
  cnicMedia: String,
  bFormMedia: String,
  billMedia: String,
  registrationNumber: String
});

const Family = mongoose.model('Family', familySchema);
module.exports = Family;
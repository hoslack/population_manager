const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
    unique: true
  },
  male: {
    type: Number,
    required: true
  },
  female: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  parent: {
    type: String,
    required: false
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;

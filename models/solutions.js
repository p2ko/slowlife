var mongoose = require('mongoose');
var Schema = new mongoose.Schema({
  title: String,
  created_at: {type: Date, default: Date.now()},
  updated_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Solution', Schema);

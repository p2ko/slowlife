var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  title: String,
  created_at: {type: Date, default: Date.now()},
  update_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Reason', Schema);

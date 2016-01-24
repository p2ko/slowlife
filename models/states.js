var mongoose = require('mongoose');
var ReasonModel = require('./reasons');
var SolutionModel = require('./solutions');

var Schema = new mongoose.Schema({
  name: String,
  reason: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reason'}],
  solution: [{type: mongoose.Schema.Types.ObjectId, ref: 'Solution'}],
  created_at: {type: Date, default: Date.now()},
  updated_at: {type: Date, default: Date.now()}
});
var Model;

Schema.statics.findNames = function (cb) {
  this.find({}).exec(cb);
};

Schema.statics.createStateAndShowReasons = function (state, cb) {
  this.create(state, function (err) {
    if (err) return cb(err);

    this.find(state).
      select({reason: 1}).
      // populate("reason").
      exec(function (err, reasons) {
        if (err) return cb(err);
        cb(null, reasons);
      });
  });
};

Schema.statics.createReasonAndShowSolutions = function (doc, cb) {
  this.findOne({_id: doc.stateId}, function (err, state) {
    var reason;
    if (err) return cb(err);

    reason = new ReasonModel({title: doc.title});

    reason.save(function (err, reason) {
      if (err) return cb(err);
      state.reason.push(reason);
      state.save();

      Model.find({}).
        populate('reason').
        exec(function (err, states) {
          if (err) return cb(err);
          cb(null, states);
        });
    });
  });
};

Schema.statics.createSolutionAndShowIt = function (doc, cb) {
  this.findOne({_id: doc.stateId}, function (err, state) {
    var solution;
    if (err) return cb(err);

    solution = new SolutionModel({title: doc.title});

    solution.save(function (err, solution) {
      if (err) return cb(err);
      state.solution.push(solution);
      state.save();

      Model.findOne({_id: doc.stateId}).
        populate('reason solution').
        exec(function (err, states) {
          if (err) return cb(err);
          cb(null, states);
        });
    });
  });
}

Model =  mongoose.model('State', Schema);
module.exports = Model;

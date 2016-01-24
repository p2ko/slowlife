var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var State = require('../models/states');

/* GET home page. */
router.get('/', function(req, res, next) {
  State.findNames(function (err, states) {
    if (err) return next (err);

    res.render('states', {states: states, title: 'state'});
  });
});

router.post('/reasons/', function (req, res, next) {
  var name = req.body.name;

  State.createStateAndShowReasons({name: name}, function (err, reasons) {
    if (err) return next(err);
      res.json(reasons);
  });
});

router.post('/solutions/', function (req, res, next) {
  var name = req.body.name;
  var stateId = req.body.id;

  State.createReasonAndShowSolutions({title: name, stateId: stateId}, function (err, solutions){
    if (err) return next(err);
    res.json(solutions);
  });
});

router.post('/end/', function (req, res, next) {
  var name = req.body.name;
  var stateId = req.body.id;

  State.createSolutionAndShowIt({title: name, stateId: stateId}, function (err, state){
    if (err) return next(err);
    res.json(state);
  });
});

module.exports = router;

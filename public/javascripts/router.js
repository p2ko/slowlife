var $ = require('jquery');
var Backbone = require('backbone');
var HomeView = require('./viewhome');
Backbone.$ = $;

module.exports = Backbone.Router.extend({
  routes: {
    "": "home"
  },
  home: function () {
    new HomeView().render();
  }
});

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
//var template = require('./state.jade');
var template = require('./state.jade');
Backbone.$ = $;

var Model = Backbone.Model.extend({
    url: 'http://localhost:3000/states',
    urlRoot: 'http://localhost:3000/states',
    parse: function (response, options) {
        var states = {
            title: 'Test'
        }
        states.states = _.map(response, function (state) {
            return {name: state.name}
        });

        return states;
        //Backbone.Model.prototype.parse.apply(this, [states, options]);
    }
});

var model = new Model();

module.exports = Backbone.View.extend({
    el: 'body',
    render: function () {
        model.fetch({
            success: function (res) {
                this.$el.html(template(model.toJSON()));
                return this;
            }.bind(this)
        })

    }
});

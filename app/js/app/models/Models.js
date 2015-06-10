define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $           = require('jquery'),
        Backbone    = require('backbone'),
        _           = require('underscore');

    // CONTENT :::::::::::::::::::::::::::::::::::

    var Item = Backbone.Model.extend({

      urlRoot: "/items",
      idAttribute: "_id",
      defaults: {
          _id: null,
          name: "",
          grapes: "",
          country: "",
          region: "",
          year: "",
          description: "",
          picture: null
      },

      initialize: function () {
          this.validators = {};

          this.validators.name = function (value) {
              return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
          };

          this.validators.grapes = function (value) {
              return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a grape variety"};
          };

          this.validators.country = function (value) {
              return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a country"};
          };
      },

      validateItem: function (key) {
          return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
      },

      validateAll: function () {

          var messages = {};

          for (var key in this.validators) {
              if(this.validators.hasOwnProperty(key)) {
                  var check = this.validators[key](this.get(key));
                  if (check.isValid === false) {
                      messages[key] = check.message;
                  }
              }
          }

          return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
      },



    });

    return Item

});

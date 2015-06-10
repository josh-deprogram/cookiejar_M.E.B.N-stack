define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $           = require('jquery'),
        Backbone    = require('backbone'),
        _           = require('underscore'),
        Item     = require('app/models/Models');

    // CONTENT :::::::::::::::::::::::::::::::::::

    var ItemCollection = Backbone.Collection.extend({
      model:Item,
      url: "/items"
    });

    // Return the model for the module
    return ItemCollection;


});

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $           = require('jquery'),
        Backbone    = require('backbone'),
        _           = require('underscore'),
        Project     = require('models.Project');

    // CONTENT :::::::::::::::::::::::::::::::::::

    var PrjCollection = Backbone.Collection.extend({
      model:Project,
      // url:"data/projects.json"
    });

    // Return the model for the module
    return PrjCollection;


});

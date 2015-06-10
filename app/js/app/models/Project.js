define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $           = require('jquery'),
        Backbone    = require('backbone'),
        _           = require('underscore');

    // CONTENT :::::::::::::::::::::::::::::::::::
    
    var AppModel = Backbone.Model.extend({

      defaults: {
        "title": "",
        "desc": "",
        "thumb": "",
        "link": "",
        "type":""
      },
      
      initialize: function(){
                
        // listens for change update  
        this.on('change', function(){
            console.log( 'Model updated');
        });
    }

    });

    return AppModel

});
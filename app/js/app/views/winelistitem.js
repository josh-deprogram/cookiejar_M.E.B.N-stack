// THE INTRO VIEW ::::::::::::::::::::::::

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                  = require('jquery'),
        Backbone           = require('backbone'),
        _                  = require('underscore'),
        TweenMax           = require('tweenmax'),
        projectTemplate    = require("text!../../../templates/WineListItemView.html");

    // CONTENT :::::::::::::::::::::::::::::::::::
    var scope;
    var WineList = Backbone.View.extend({

        tagName:'li',
        // el:'.thumbnails',  //selects element rendering to
        template: _.template( projectTemplate ),

        initialize: function () {
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },


        // Clean hanging events of the view on change :::::::::::::::::::
        dispose:function(){
            // console.log('cleaned');
        }

    });


    // Our module now returns our view
    return WineList;

});

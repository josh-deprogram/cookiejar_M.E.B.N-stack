// THE INTRO VIEW ::::::::::::::::::::::::

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                  = require('jquery'),
        Backbone           = require('backbone'),
        _                  = require('underscore'),
        TweenMax           = require('tweenmax'),
        ItemCollection     = require('app/collections/Collection'),
        Model              = require('app/models/Models'),
        template           = require("text!../../../templates/HomeView.html");

    // CONTENT :::::::::::::::::::::::::::::::::::
    var scope;

    var HomeView = Backbone.View.extend({

        tagName:'div',
        id:"slides",
        el:'#viewport',  //selects element rendering to
        template: _.template( template ), //selects the template with given name
        events: {
            //  'click .cbp-popup-close': 'close',
        },


        initialize:function (appsocket) {
              scope = this;
              this.render();
              console.log("VIEWING Home ");
        },

        render:function () {

            this.$el.html(this.template());
            // console.log('rendering.... ', this.template())
            //fade in.
            // TweenMax.to(scope.$el.find('.container'), 0.5, {alpha:1});

            return this;
        },

        // Clean hanging events of the view on change :::::::::::::::::::
        dispose:function(){
            // console.log('cleaned');
        }

    });


    // Our module now returns our view
    return HomeView;

});

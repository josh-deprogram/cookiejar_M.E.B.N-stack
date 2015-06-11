// Information view

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                  = require('jquery'),
        Backbone           = require('backbone'),
        _                  = require('underscore'),
        TweenMax           = require('tweenmax'),
        projectTemplate    = require("text!../../../templates/AboutView.html");

    // CONTENT :::::::::::::::::::::::::::::::::::
    var scope;
    var IntroView = Backbone.View.extend({

        tagName:'div',
        id:"slides",
        el:'#viewport',  //selects element rendering to
        template: _.template( projectTemplate ),

        events: {
             // 'click #btn1': 'answer',
        },


        initialize:function (appsocket) {
              scope = this;
              this.render();
        },

        render:function () {

            this.$el.html(this.template());

            //fade in.
            TweenMax.to(scope.$el.find('.container'), 0.5, {alpha:1});

            return this;
        },

        // Clean hanging events of the view on change :::::::::::::::::::
        dispose:function(){
            // console.log('cleaned');
        }

    });


    // Our module now returns our view
    return IntroView;

});

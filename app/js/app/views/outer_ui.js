// THE INTRO VIEW ::::::::::::::::::::::::

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                  = require('jquery'),
        Backbone           = require('backbone'),
        _                  = require('underscore'),
        TweenMax           = require('tweenmax'),
        projectTemplate    = require("text!../../../templates/outer_ui.html");

    // CONTENT :::::::::::::::::::::::::::::::::::

    var scope;

    var OuterView = Backbone.View.extend({

        tagName:'div',
        id:"slides",
        el:'#container',  //selects element rendering to
        template: _.template( projectTemplate ), //selects the template with given name

        events: {
             'click .navitem': 'navClick',
            //  'click .navbar-brand': 'logoClick'
        },


        initialize:function (innerview) {
              scope = this;
              this.render();
        },

        render:function () {

            this.$el.html(this.template());

            //fade in.
            TweenMax.to(scope.$el.find('.container'), 1, {alpha:1});

            return this;
        },

        navClick:function(ev){
            var name = $(ev.target).data('name');
            // var $target = $(ev.target);
            // $( "ul.nav > li a" ).removeClass('active');
            // $target.addClass('active');

            var Router = require('router');
            var appRouter = new Router();

            switch(name){
              case 'home':
                  appRouter.navigate('', { trigger :true });
              break;
              case 'browse':
                  appRouter.navigate('#items', { trigger :true });
              break;
              case 'add':
                  appRouter.navigate('#items/add', { trigger :true });
              break;
              case 'info':
                  appRouter.navigate('info', { trigger :true });
              break;
            }

        },

        // Clean hanging events of the view on change :::::::::::::::::::
        dispose:function(){
            // console.log('cleaned');
        }

    });


    // Our module now returns our view
    return OuterView;

});

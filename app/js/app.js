
// ==============================
// THE MAIN APPLICAIOTN LOGIC .
// ==============================

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        _                   = require('underscore'),
        Fastclick           = require('fastclick'),
        Router              = require('router'),
        bootstrap           = require('bootstrap');

    var initialize = function(){

        console.log('%c DESIGN BUILD PLAY ', 'background: #f2ff1a; color: #0000; padding:2px;');
        console.log('%c INFO@DESIGNBUILDPLAY.co.uk   JOSH FREEMAN ', 'background: #000000; color: #f2ff1a; padding:2px;');
        console.log('%c PROJECT TEMPLATE ', 'background: #ff0000; color: #ffffff; padding:2px; font-size:16px;');

        var appRouter = new Router();  //define our new instance of router
        Backbone.history.start();   // use # History API

        //ADD FASTCLICK
        FastClick.attach(document.body);
  }

  return {
    initialize: initialize

  };

});

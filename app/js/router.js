
// ========
// ROUTER :
// ========

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES :::::::::::::::::::

    var $              = require('jquery'),
        Backbone       = require('backbone'),
        _              = require('underscore'),
        OuterView      = require('app/views/outer_ui'),
        HomeView       = require('app/views/home'),
        ItemDetail     = require('app/views/itemDetails'),
        ItemListView   = require('app/views/itemsList'),
        Info           = require('app/views/info'),
        AboutView      = require('app/views/info'),
        Item           = require('app/models/Models'),
        ItemCollection = require('app/collections/Collection');

    var scope,
        mainView = null,
        subView = null,
        homeView,
        container = '#container',
        inner = '#inner',
        el = '<div id="viewport"></div>';

   //define router class
    var AppRouter = Backbone.Router.extend ({
        routes: {
            '' : 'home',
            'home' : 'home',
            'info' : 'info',
            "items"	: "list",
            "items/page/:page"	: "list",
            "items/add"         : "addItem",
            "items/:id"         : "itemDetails",
            "about"             : "info"
        },

        initialize: function(){
               scope = this;
        },

        newView: function(View){

            if(mainView){
                mainView.unbind();
                mainView.remove();
            }

            mainView = new View();
        },

        subView: function(View, page, id, model){

            if(subView){
                subView.dispose();
                subView.unbind();
                subView.remove();
                $(inner).append(el);
            }

            if(!mainView){
                scope.newView( OuterView ); //Creates the main view if not there already
            }

            // console.log('id is', id);
            subView = new View(page, id, model);
        },

        info: function () {
            //Pass in view to cleaner func
            scope.subView( Info );
        },


        home: function (id) {
            if (!homeView) {
                scope.subView( HomeView );
            }
        },

        list: function(page) {
            scope.subView( ItemListView, page );
        },

        itemDetails: function (id) {
            scope.subView( ItemDetail, null, id );
        },

        addItem: function() {
            // Create new blank model.
            var item = new Item();
            scope.subView( ItemDetail, null, null, item );
        },


    });


  return AppRouter;

});

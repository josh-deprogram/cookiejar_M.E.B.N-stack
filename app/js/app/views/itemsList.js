// THE INTRO VIEW ::::::::::::::::::::::::

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                  = require('jquery'),
        Backbone           = require('backbone'),
        _                  = require('underscore'),
        TweenMax           = require('tweenmax'),
        ItemCollection     = require('app/collections/Collection'),
        ItemsListItemView   = require('app/views/itemsListItem'),
        projectTemplate    = require("text!../../../templates/ItemsList.html");


    // CONTENT :::::::::::::::::::::::::::::::::::
    var scope;
    var WineList = Backbone.View.extend({

        tagName:'div',
        el:'#viewport',
        template: _.template( projectTemplate ),

        events: {
          'click .filterItem' : 'filterList'
        },

        initialize:function (page) {
              scope = this;
              this.page = page;
              this.render();
        },

        render: function () {

            $(this.el).html(scope.template());

            // console.log('page ', scope.page)
            var p = scope.page ? parseInt(scope.page, 10) : 1;
            var itemList = new ItemCollection();

            itemList.fetch({success: function(data){
              // console.log('success ', data);
              scope.model = itemList;
              scope.page = p;
              scope.populateItemsList()
            }});

            return this;
        },

        populateItemsList:function(filter){

          var items = this.model.models;

          for (var i = 0; i <  items.length; i++) {
              $(scope.$el.find('.thumbnails'), this.el).append(new ItemsListItemView({model: items[i]}).render().el);
          }

        },

        filterList:function(ev){
          var name = $(ev.target).data('name');
          var items = this.model.models;

          // Empty the current list.
          $(scope.$el.find('.thumbnails')).empty();

          switch (name){
            case 'all':
              scope.populateItemsList();
            break;

            case 'year':
              for (var i = 0; i <  items.length; i++) {
                if(items[i].attributes.year === '2010'){
                  $(scope.$el.find('.thumbnails'), this.el).append(new ItemsListItemView({model: items[i]}).render().el);
                }
              }
            break;

            case 'country':
              for (var i = 0; i <  items.length; i++) {
                if(items[i].attributes.country === 'USA'){
                  $(scope.$el.find('.thumbnails'), this.el).append(new ItemsListItemView({model: items[i]}).render().el);
                }
              }
            break;

          }
        },

        // Clean hanging events of the view on change :::::::::::::::::::
        dispose:function(){
            // console.log('cleaned');
        }

    });


    // Our module now returns our view
    return WineList;

});

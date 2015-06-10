// THE INTRO VIEW ::::::::::::::::::::::::

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                  = require('jquery'),
        Backbone           = require('backbone'),
        _                  = require('underscore'),
        TweenMax           = require('tweenmax'),
        ItemCollection     = require('app/collections/Collection'),
        WineListItemView   = require('app/views/winelistitem');
        // projectTemplate    = require("text!../../../templates/WineList.html");

    // CONTENT :::::::::::::::::::::::::::::::::::
    var scope;
    var WineList = Backbone.View.extend({

        tagName:'div',
        el:'#viewport',  //selects element rendering to
        // template: _.template( projectTemplate ),

        events: {
             // 'click #btn1': 'answer',
        },


        initialize:function (page) {
              scope = this;
              this.page = page;
              this.render();
        },

        render: function () {

            $(this.el).html('<ul class="thumbnails"></ul>');
            // console.log('page ', scope.page)
            var p = scope.page ? parseInt(scope.page, 10) : 1;
            var wineList = new ItemCollection();

            wineList.fetch({success: function(data){
              console.log('success ', data);
              scope.model = wineList;
              scope.page = p;
              scope.populateItemsList()
            }});

            // $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

            return this;
        },

        populateItemsList:function(){

          var items = this.model.models;
          // var len = wines.length;
          // var startPos = (this.options.page - 1) * 8;
          // var endPos = Math.min(startPos + 8, len);

          for (var i = 0; i <  items.length; i++) {
            // $('.thumbnails', this.el).append("   LI ITEM ", i);
            $('.thumbnails', this.el).append(new WineListItemView({model: items[i]}).render().el);
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

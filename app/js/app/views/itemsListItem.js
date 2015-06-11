// THE INTRO VIEW ::::::::::::::::::::::::

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                  = require('jquery'),
        Backbone           = require('backbone'),
        _                  = require('underscore'),
        projectTemplate    = require("text!../../../templates/ItemsListItemView.html");

    // CONTENT :::::::::::::::::::::::::::::::::::
    var scope;
    var WineListItem = Backbone.View.extend({

        tagName:'li',
        template: _.template( projectTemplate ),

        initialize: function () {
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render: function () {
            var scope = this;
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },


        // Clean hanging events of the view on change :::::::::::::::::::
        dispose:function(){
            // console.log('cleaned');
        }

    });


    // Our module now returns our view
    return WineListItem;

});

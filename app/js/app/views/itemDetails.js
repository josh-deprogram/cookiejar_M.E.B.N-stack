// Item Detail

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                  = require('jquery'),
        Backbone           = require('backbone'),
        _                  = require('underscore'),
        TweenMax           = require('tweenmax'),
        Item               = require('app/models/Models'),
        Utils              = require('app/utils/utils'),
        projectTemplate    = require("text!../../../templates/ItemDetail.html");

    // CONTENT :::::::::::::::::::::::::::::::::::
    var scope;
    var ItemView = Backbone.View.extend({

        tagName:'div',
        el:'#viewport',  //selects element rendering to
        template: _.template( projectTemplate ),

        events: {
            "change"        : "change",
            "click .save"   : "beforeSave",
            "click .delete" : "deleteItem",
            "drop #picture" : "dropHandler"
        },

        initialize:function (page, id, model) {
              // console.log('got id ', id);
              scope = this;
              this.model = model;
              this.id = id;
              this.utils = new Utils();
              this.render();
              // console.log('model is ', scope.model)
        },

        render:function () {

          if(!scope.model){
            var item = new Item({_id: scope.id});

            item.fetch({success: function(){
                // console.log('got mod ', item)
                scope.model = item;
                scope.populateDetails()
            }});
          }else{
            scope.populateDetails()
          }



          return this;
        },

        populateDetails:function(){
          // console.log(scope.model)
          scope.$el.html(scope.template(scope.model.toJSON()));

          //fade in.
          TweenMax.to(scope.$el.find('.container'), 0.5, {alpha:1});
        },

        change: function (event) {
            // Remove any existing alert message
            scope.utils.hideAlert();

            // Apply the change to the model
            var target = event.target;
            var change = {};
            change[target.name] = target.value;
            this.model.set(change);

            // Run validation rule (if any) on changed item
            var check = this.model.validateItem(target.id);
            if (check.isValid === false) {
              scope.utils.addValidationError(target.id, check.message);
            } else {
              scope.utils.removeValidationError(target.id);
            }
        },

        beforeSave: function () {
            var self = this;
            var check = this.model.validateAll();
            if (check.isValid === false) {
                scope.utils.displayValidationErrors(check.messages);
                return false;
            }
            this.saveItem();
            return false;
        },

        saveItem: function () {
            var self = this;
            console.log('before save');
            this.model.save(null, {
                success: function (model) {
                    self.render();
                    var Router = require('router');
                    var appRouter = new Router();
                    appRouter.navigate('items/' + model.id, false);
                    scope.utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
                },
                error: function () {
                    scope.utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            });
        },

        deleteItem: function () {
            this.model.destroy({
                success: function () {
                    alert('ITEM deleted successfully');
                    window.history.back();
                }
            });
            return false;
        },

        dropHandler: function (event) {
            event.stopPropagation();
            event.preventDefault();
            var e = event.originalEvent;
            e.dataTransfer.dropEffect = 'copy';
            this.pictureFile = e.dataTransfer.files[0];

            // Read the image file from the local file system and display it in the img tag
            var reader = new FileReader();
            reader.onloadend = function () {
                $('#picture').attr('src', reader.result);
            };
            reader.readAsDataURL(this.pictureFile);
        },

        // Clean hanging events of the view on change :::::::::::::::::::
        dispose:function(){
            // console.log('cleaned');
        }

    });


    return ItemView;

});

// THE INTRO VIEW ::::::::::::::::::::::::

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                  = require('jquery'),
        Backbone           = require('backbone'),
        _                  = require('underscore'),
        TweenMax           = require('tweenmax'),
        Item               = require('app/models/Models'),
        projectTemplate    = require("text!../../../templates/WineDetail.html");

    // CONTENT :::::::::::::::::::::::::::::::::::
    var scope;
    var WineView = Backbone.View.extend({

        tagName:'div',
        el:'#viewport',  //selects element rendering to
        template: _.template( projectTemplate ),

        events: {
            "change"        : "change",
            "click .save"   : "beforeSave",
            "click .delete" : "deleteWine",
            "drop #picture" : "dropHandler"
        },

        initialize:function (page, id) {
              console.log('got id ', id);
              scope = this;
              this.id = id;
              this.render();
        },

        render:function () {

          var item = new Item({_id: scope.id});

          item.fetch({success: function(){
              // console.log('got mod ', item)
              scope.model = item;
              scope.populateDetails()
          }});

          return this;
        },

        populateDetails:function(){
          // console.log(scope.model)
          scope.$el.html(scope.template(scope.model.toJSON()));
        },

        change: function (event) {
            // Remove any existing alert message
            utils.hideAlert();

            // Apply the change to the model
            var target = event.target;
            var change = {};
            change[target.name] = target.value;
            this.model.set(change);

            // Run validation rule (if any) on changed item
            var check = this.model.validateItem(target.id);
            if (check.isValid === false) {
                utils.addValidationError(target.id, check.message);
            } else {
                utils.removeValidationError(target.id);
            }
        },

        beforeSave: function () {
            var self = this;
            var check = this.model.validateAll();
            if (check.isValid === false) {
                utils.displayValidationErrors(check.messages);
                return false;
            }
            this.saveWine();
            return false;
        },

        saveWine: function () {
            var self = this;
            console.log('before save');
            this.model.save(null, {
                success: function (model) {
                    self.render();
                    app.navigate('wines/' + model.id, false);
                    utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
                },
                error: function () {
                    utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            });
        },

        deleteWine: function () {
            this.model.destroy({
                success: function () {
                    alert('Wine deleted successfully');
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
            // TweenMax.set(scope.$el.find('.container'), {alpha:0});
        }

    });


    return WineView;

});

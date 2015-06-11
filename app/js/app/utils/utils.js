/*
 * General Utils module.
 *
 */

define(function (require) {

    "use strict";

    // DEFINE THE REQUIRES ::::::::::::::::::::::::
    var $                = require('jquery'),
      Backbone           = require('backbone'),
      _                  = require('underscore');

    // CONTENT :::::::::::::::::::::::::::::::::::

    var Utils = function(){

    }

    Utils.prototype.testMeth = function (message) {
        console.log('UTILS method called: ', message);
    },


    Utils.prototype.displayValidationErrors = function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
        this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
    },

    Utils.prototype.addValidationError = function (field, message) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-inline', controlGroup).html(message);
    },

    Utils.prototype.removeValidationError = function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-inline', controlGroup).html('');
    },

    Utils.prototype.showAlert = function(title, text, klass) {
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show();
    },

    Utils.prototype.hideAlert = function() {
        $('.alert').hide();
    }

    return Utils
})


// Script loader (RequireJS) ==========================

require.config({

  //'baseUrl': '/DBP/dbp_phase2/dbp_p2_build/js/', // THE BASE URL

   paths: {
        /* jQuery */
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore-min',
        'backbone': 'lib/backbone-min',

         /* Router */
        'router': 'router',
        'bootstrap': 'lib/bootstrap/bootstrap',

        'tweenmax': 'lib/gs/TweenMax.min',
        'timelinemax': 'lib/gs/TimelineMax.min',
        'timelinelite': 'lib/gs/TimelineLite.min',
        'EasePack': 'lib/gs/EasePack.min',
        'ease': 'lib/gs/easing/EasePack.min',
        'fastclick': 'lib/fastclick',

        /* APP MODULES */
        'app': 'app',
        'view.intro': 'app/views/home',
        'models.Project': 'app/models/Project',
        'collection.Projects': 'app/collections/Projects'

    },

    shim: {

        'underscore': {
          'exports': '_'
        },

        'backbone': {
          'deps': ['jquery', 'underscore'],
          'exports': 'Backbone'
        },

        'bootstrap': {
          'deps': ['jquery'],
        },

        'fastclick': { exports: 'FastClick' },
        'proton': { exports: 'Proton' },

        "tweenmax" :
         {deps: ["jquery"],
          exports :"TweenMax"
         },

        'timelinemax': { deps:  ["tweenmax"],  exports: 'TimelineMax' },
   }
});


require([
  // Load our app module and pass it to our definition function

  'app',
  'jquery',
  'backbone',


], function(App, $, Backbone){
    // The "app" dependency is passed in as "App"
    App.initialize();

});

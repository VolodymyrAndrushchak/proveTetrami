/*

  Randomino App Init 
  Copyright (c) 2016  SRL - 


  
  dr.hamzamusa@gmail.com

  file: app.js

*/



import * as _ from 'underscore';
import 'angular-credit-cards'
import 'ng-mask'







function onReady() {
    angular.bootstrap(document, ['randomino']);
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}



angular.module('randomino', ['ionic', 'angular-meteor','ngSanitize', 'pascalprecht.translate', 'randomino.controllers', 'ngAnimate', 'ezfb', 'credit-cards' ,'ngMask'])


.run(function ($ionicPlatform, $rootScope, $timeout, $state, $translate, $ionicLoading) {

    $ionicPlatform.ready(function () {
        ionic.Platform.fullScreen();
        ionic.Platform.isFullScreen = true;


        if (navigator && navigator.splashscreen) {
            navigator.splashscreen.hide();
        }

        if (window.StatusBar) {
            StatusBar.hide();
        }

        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                $ionicLoading.show({
                    template: '<br> connection lost ...'
                })
            }
        }


        Meteor.startup(function () {
            if (Meteor.userId) {
                Meteor.call('getLanguage', Meteor.userId(), function (err, userLang) {
                    if (userLang) {
                        $translate.use(userLang);
                    }
                })

            }
        })


        //disabled
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (toState.data && toState.data.auth == true && !Meteor.userId()) {
                    event.preventDefault()
                    $state.go('app.start');
                }
            });

    });
});

angular.module('randomino').config(['$compileProvider', function ($compileProvider) {
    // disable debug info
    $compileProvider.debugInfoEnabled(false);
}]);
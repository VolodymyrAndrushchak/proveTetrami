var app = angular.module('randomino');

app.config(function ($translateProvider) {


    //$translateProvider.useSanitizeValueStrategy('sanitize');
    
    $translateProvider.useSanitizeValueStrategy(null);



    $translateProvider.useStaticFilesLoader({
        prefix: '/translate/',
        suffix: '.json'
    });

    //    $translateProvider.preferredLanguage('en-US');
    //    var userLanguage = Meteor.user();
    //    console.log(userLanguage)
    //    if (userLanguage) {
    //        $translateProvider.preferredLanguage(userLanguage.profile.lang);
    //    } else {
    $translateProvider.preferredLanguage("en");
    //    }
});
//
//app.controller('Ctrl', function ($scope, $translate) {
//    $scope.changeLanguage = function (key) {
//        $translate.use(key);
//    };
//});
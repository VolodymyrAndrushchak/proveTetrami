angular.module('randomino').controller('usrSettings', usrSettings);

function usrSettings($scope, $reactive) {


    $scope.helpers({
        lang: () => {


            return Meteor.user();
        }
    })



}
angular.module('randomino').controller('logOutCtrl', logOutCtrl);


function logOutCtrl($scope, $state, $timeout ) {

    

    $scope.doLogout = function () {
        
        
        
        

        
        
            Meteor.logout(function (err) {

            });





    }
}
/*

    subscribe to : userLives
*/



angular.module('randomino').controller('MyController', MyController);

function MyController($scope, $reactive, $ionicPopup, $timeout, $ionicModal) {

    $reactive(this).attach($scope);




    $ionicModal.fromTemplateUrl('client/templates/_popup.lives.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
   


    $scope.dec = function () {
        $scope.modal.show();
    }


    $scope.closeModal = function () {
        $scope.modal.hide()
    }


}
/*


*/




angular.module('randomino').controller('checkoutPayment', checkoutPayment);


function checkoutPayment($scope, $reactive,  $state, $stateParams) {

    $scope.checkoutConfirm = function () {
        $state.go('app.checkout-confirm', {
            playId: $stateParams.playId
        });
    }
    
    
    $scope.goBack = function () {
        $state.go('app.checkout-address', {
            playId: $stateParams.playId
        });
    }

}
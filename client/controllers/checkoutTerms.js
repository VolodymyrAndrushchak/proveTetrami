angular.module('randomino').controller('checkoutTerms', checkoutTerms);


function checkoutTerms($scope, $reactive, $stateParams, $state) {

    $scope.backCheckoutConfirm = function () {
        $state.go('app.checkout-confirm', {
            playId: $stateParams.playId
        });
    }
}
/*

=== Checkout Control .

==== Getting product function.


*/

angular.module('randomino').controller('checkOutCtrl', checkOutCtrl);

function checkOutCtrl($scope, $reactive, $rootScope, $state, $stateParams) {

    $reactive(this).attach($scope);

    $scope.subscribe('getPlayWon', function () {
        return [$stateParams.playId];
    });

    $scope.helpers({
        play: () => {
            return Plays.findOne($stateParams.playId)
        }
    });

    $scope.imagex = function (id) {
        var ImageObj = Images.files.findOne(id)
        if (ImageObj) {
            return ImageObj.url({
            })
        };
    };

    $scope.checkoutAddress = function () {
        $state.go('app.checkout-address', {
            playId: $stateParams.playId
        });
    }


}
/*
    Orders.

*/

angular.module('randomino').controller('OrdersCtrl', OrdersCtrl);

function OrdersCtrl($scope, $reactive, $stateParams, $state) {
    $reactive(this).attach($scope);

    $scope.subscribe('ordersUser')
    $scope.helpers({
        orders: () => {
            
            return Orders.find();
        }
    });
    $scope.imagex = function (id) {

        var ImageObj = Images.files.findOne(id)
        if (ImageObj) {
            return ImageObj.url({
            })
        };

    };


}
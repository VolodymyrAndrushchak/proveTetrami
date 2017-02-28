angular.module('randomino').controller('CartCtrl', CartCtrl);

function CartCtrl($scope, $ionicListDelegate, $reactive) {

    $reactive(this).attach($scope);

    this.subscribe('cartItems');
    
    this.subscribe('cartProducts');

    $scope.helpers({
        items: () => {
            return Cart.find({});
        },
        getTotal: () => {
            return Cart.find().count();
        },
        prod: (pro) => {
            var product = this.product;
            return pro;
        }
    });


    $scope.productData = function(pro){
        return Products.findOne(pro);
    } ;



    // removes product from cart (making in persistent)
    $scope.dropProduct = function (id) {
        //$scope.cart.products.splice($index, 1);
        // alert(id)

        Meteor.call('removeCartItem', id)
            // as this method is triggered in an <ion-option-button>
            // we close the list after that (not strictly needed)
        $ionicListDelegate.closeOptionButtons();

    }

}
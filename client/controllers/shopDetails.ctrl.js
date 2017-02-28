/*
        Product Details Controller 

        Get Product Details 
        
        
        Start Challange 
        
            == Start a Game Session
        
        Add Product to Cart 
            - Product.id , Date Created 
            
        Cart Server :
            productId 
            userId 
            challangeId 
            currentDiscount
            earnings ( set by timer )

*/

//

angular.module('randomino').filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

//

angular.module('randomino').controller('ProdetailsCtrl', ProdetailsCtrl);

function ProdetailsCtrl($scope, $state, $stateParams, $reactive, $ionicPopup, $sce , $rootScope) {

    $reactive(this).attach($scope);


    

    this.subscribe('singleProduct', function () {
        return [$stateParams.productId]
    });

    this.subscribe('productImages')


    $scope.get_pre = function (x) {
        return $sce.trustAsHtml(x);
    };


    $scope.renderHTML = function (html_code) {
        return $sce.trustAsHtml(html_code);
    };

    //    $scope.doRefresh = function () {

    $scope.helpers({
        prodetail: () => {
            return Products.findOne($stateParams.productId);
        }

    });

    $scope.imagex = function (id) {
        var ImageObj = Images.files.findOne(id)
        if (ImageObj) {
            return ImageObj.url({})
        };
    };


    // Start Challenge
    $scope.addToCartClient = function (data) {

        var product = Products.findOne($stateParams.productId);
        $rootScope.challenge = product;

        $state.go('app.challenge-start', {
            productId: $stateParams.productId
        });



    };


}
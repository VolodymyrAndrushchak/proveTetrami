/*

    ==Checkout confirm 
    
    == Display product / Old price / New price 
    
    == Procced to checkput function
    
    
    == 

*/




Meteor.startup(function () {
    Stripe.setPublishableKey('pk_test_fcmBeY87tCe8i3Q6LNcC2uzF');
})

angular.module('randomino').controller('checkoutConfirm', checkoutConfirm);


function checkoutConfirm($scope, $reactive, $stateParams, $state, $rootScope, $ionicPopup) {


    $scope.cardtype = {};
    $scope.card = {};



    $reactive(this).attach($scope);

    $scope.subscribe('getPlayWon', function () {
        return [$stateParams.playId];
    });

    $scope.helpers({

        play: () => {
            return Plays.findOne($stateParams.playId)
        }

    });

    $scope.checkoutTerms = function () {
        $state.go('app.checkout-terms', {
            playId: $stateParams.playId
        });
    }

    $scope.pushNotification = {
        checked: false
    };


    $scope.goBack = function () {
        var play = Plays.findOne($stateParams.playId);
        if (play.wonFree) {
            $state.go('app.checkout-address', {
                playId: $stateParams.playId
            });
        } else {
            $state.go('app.checkout-payment', {
                playId: $stateParams.playId
            });
        }

    }


    $scope.makeStripePayment = function (card) {
        console.log(card)
    }

    //    console.log($scope.pushNotification.checked)

    //ui-sref="app.checkout-successful"




    ccNum = 4242424242424242;
    cvc = 123;
    expMo = 1;
    expYr = 19;


    $scope.checkoutBuy = function (card) {


        var play = Plays.findOne($stateParams.playId);



        var confirm = $scope.pushNotification.checked;


        if (confirm) {
            if (!play.wonFree) {

                Stripe.card.createToken({
                    number: card.number,
                    cvc: card.cvc,
                    exp_month: card.exp_month,
                    exp_year: card.exp_year,
                    name: play.productName
                }, function (status, response) {
                    console.log(response)
                    var callStripePlay = {
                        stripeToken: response.id,
                        play: play,
                        priceCheckout: Math.round(play.newPrice * 100)
                    }
                    Meteor.call('chargeCard', callStripePlay, function (err) {
                        if (!err) {
                            $state.go("app.checkout-successful")
                        }
                    });
                });



            } else {
                //                console.log(play)
                Meteor.call('setNewOrder', play, function (err) {
                    if (!err) {
                        $state.go("app.checkout-successful")
                    }
                })
            }
        } else {

            console.log('please agree')

            var confirmPopup = $ionicPopup.confirm({
                title: '<span class="black-text">Error</span>',
                template: '<span class="black-text">Please read and accept  Terms &amp; Conditions</span>'
            });

        }




    }

}
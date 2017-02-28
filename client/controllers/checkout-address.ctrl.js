angular.module('randomino').controller('checkoutAddress', checkoutAddress);


function checkoutAddress($scope, $reactive, $state, $stateParams, $ionicPopup, $rootScope) {

    $reactive(this).attach($scope);

    $scope.subscribe('getPlayWon', function () {
        return [$stateParams.playId];
    });

    $scope.helpers({
        //        play: () => {
        //            var play = Plays.findOne($stateParams.playId);
        //            
        ////            console.log(profile)
        //            if (play && play.address) {
        //                var address = play.address
        //                return address
        //            } else{
        //                
        //                var profile = Meteor.user()
        //                return profile.profile.address
        //            }
        //        }

    });


    $scope.goBack = function () {
        $state.go('app.checkout', {
            playId: $stateParams.playId
        });
    }

    $scope.checkoutConfirm = function () {

        var address = {
            play: $stateParams.playId,
            fullName: $scope.profile.address.name,
            phone: $scope.profile.address.phone,
            city: $scope.profile.address.city,
            district: $scope.profile.address.district,
            address: $scope.profile.address.address,
            zip: $scope.profile.address.zip,
            email: $scope.profile.address.email

        }

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validEmail = re.test(address.email);

        if (!validEmail || !address.fullName) {

            var confirmPopup = $ionicPopup.confirm({
                title: '<span class="black-text"> Invalid Data </span>',
                template: '<span class="black-text">Please Check your Name and Email</span>'
            });

        } else {

            Meteor.call('submitPaymentAddress', address, function (err, result) {
                if (!err) {
                    var play = Plays.findOne($stateParams.playId);
                    if (play.wonFree) {
                        $state.go('app.checkout-confirm', {
                            playId: $stateParams.playId
                        });
                    } else {
                        $state.go('app.checkout-payment', {
                            playId: $stateParams.playId
                        });
                    }

                }
            })


        }






    }

}
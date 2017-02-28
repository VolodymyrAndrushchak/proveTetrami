/*
    Settings . User Address
    
    Save User Address in UserSettings Collection

*/

angular.module('randomino').controller('settingsShipment', settingsShipment);


function settingsShipment($scope, $rootScope, $reactive) {

    // get the current user Address into the Form .
//    $reactive(this).attach($scope);



//    this.subscribe('userSettings');

//    $scope.helpers({
//        profilex: () => {
//            
//            return null
//        }
//    })



    console.log($rootScope.profile)


    $scope.saveAddress = function () {





        var address = {

            name: $scope.profile.address.name,
            phone: $scope.profile.address.phone,
            city: $scope.profile.address.city,
            district: $scope.profile.address.district,
            address: $scope.profile.address.address,
            zip: $scope.profile.address.zip,
            email: $scope.profile.address.email

        }

        


        Meteor.call('setUserAddress', address, function (err) {
            if (!err) {

                console.log('done')

            }
        })
    }

}
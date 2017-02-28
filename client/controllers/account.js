angular.module('randomino').controller('profilePageCtrl', profileCtrl);

function profileCtrl($scope, $ionicPopup, $rootScope) {


    $scope.accountUser = null


    //readonly property is used to control editability of account form
    $scope.readonly = true;

    // #SIMPLIFIED-IMPLEMENTATION:
    // We act on a copy of the root user
    //    $scope.accountUser = angular.copy($rootScope.user);
    //    var userCopy = {};

    $scope.startEdit = function () {
        $scope.readonly = false;
        //        userCopy = angular.copy($scope.user);
    };

    $scope.cancelEdit = function () {
        $scope.readonly = true;
        //        $scope.user = userCopy;
    };



    // Email Validation ;

    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.saveEdit = function () {
        var user = {
            //            username : angular.copy($scope.accountUser.username),
            usr: Meteor.userId(),
            username: $scope.profile.username,
            name: $scope.profile.name,
            email: $scope.profile.email,

            //            hax: angular.element('#name')[0].val()
        }

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validEmail = re.test(user.email);

        if (!validEmail) {
            var confirmPopup = $ionicPopup.confirm({
                title: '<span class="black-text"> Invalid email</span>',
                template: '<span class="black-text">Please add a valid email</span>'
            });
        } else {
            Meteor.call('updateUserInfos', user, function (err) {
                if (err) {
                    console.log('err' + err)
                }
            })
        }


        $scope.readonly = true;
        //        $rootScope.user = $scope.accountUser;
    };
}
angular
    .module('randomino')
    .controller('LoginCtrlTest', LoginCtrlTest);
//  .controller('HomeCtrl', HomeCtrl);

function LoginCtrlTest($scope, $state, $meteor, $timeout, $rootScope, $ionicPopup) {




    $scope.doLoginAction = function (credentials) {

        //        $timeout(function () {
        //            $state.go('app.start');
        //        }, 5000);

        //console.log(credentials);
        $meteor.loginWithPassword(credentials.username, credentials.password)
            .then(function () {
                //e.preventDefault();
                //console.log('Login success ');
                //alert("logged in: " + credentials.username);
                //$location.path("/feed")
                //$state.go('app.feed');


                //
                $timeout(function () {
                    $state.go('app.feed');
                }, 500);


            }, function (_error) {

                var confirmPopup = $ionicPopup.confirm({
                    title: '<span class="black-text"> Login Error</span>',
                    template: '<span class="black-text">Login Error</span>'
                });
                //console.log('Login error - ', _error);
                $timeout(function () {
                    $state.go('app.start');
                }, 700);
                //$state.go('app.start');
                //alert("Error: " + _error.reason);
            });
        //return false;
    }



    $scope.doCreateAccountAction = function (credentials) {
        //alert(credentials);
        //console.log(credentials.username)
        $meteor.createUser({
            username: credentials.username,
            email: credentials.username,
            password: credentials.password,
            profile: {
                createdOn: new Date(),
                name: credentials.username
            }
        }).then(function (_response) {
            // console.log('doCreateAccountAction success');
            //alert("user created: " + credentials.username);
            $state.go('app.feed');
        }, function (_error) {

            var confirmPopup = $ionicPopup.confirm({
                title: '<span class="black-text"> Login Error</span>',
                template: '<span class="black-text">Login Error</span>'
            });

            //console.log('Login error - ', _error);
            $timeout(function () {
                $state.go('app.start');
            }, 1000);
            //alert("Error: " + _error.reason);
        });
        //return false;
    }

}
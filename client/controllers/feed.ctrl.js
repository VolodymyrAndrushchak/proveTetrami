angular.module('randomino').controller('FeedsCtrl', FeedsCtrl);

function FeedsCtrl($scope, $meteor, $reactive, $ionicSideMenuDelegate, $ionicLoading, $timeout, ezfb, $window, $location) {

    $ionicSideMenuDelegate.canDragContent(true)

    $reactive(this).attach($scope);

    $scope.share = function () {

        
        // Working but NOT under Cordova

        //        ezfb.ui({
        //                method: 'feed',
        //                name: 'Tetrami App',
        //                picture: 'http://tetrami.com/image/tetrami-app.png',
        //                link: 'http://tetrami.com',
        //                description: 'Play and Win' 
        //                    
        //            },
        //            function (res) {
        //                // res: FB.ui response
        //                console.log(res)
        //            }
        //        );


        // WORKING

        ezfb.ui({
            method: 'send',
            link: 'http://tetrami.com',
        });

        var options = {
            method: "apprequests",
            message: "Come on man, check out my application."
        }

        var fbLoginSuccess = function (response) {
            if (!response.authResponse) {
                fbLoginError("Cannot find the authResponse");
                return;
            }

            var authResponse = response.authResponse;

            getFacebookProfileInfo(authResponse)
                .then(function (profileInfo) {
                    // For the purpose of this example I will store user data on local storage
                    UserService.setUser({
                        authResponse: authResponse,
                        userID: profileInfo.id,
                        name: profileInfo.name,
                        email: profileInfo.email,
                        picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
                    });
                    $ionicLoading.hide();
                    $state.go('app.home');
                }, function (fail) {
                    // Fail get profile info
                    console.log('profile info fail', fail);
                });
        };



        // This is the fail callback from the login method
        var fbLoginError = function (error) {
            console.log('fbLoginError', error);

        };

        if (Meteor.isCordova) {
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);

        } else {
            console.log('null')
            alert('a')
        }
        //

        //





        //        facebookConnectPlugin.appInvite({
        //                url: "http://example.com",
        //                picture: "http://example.com/image.png"
        //            },
        //            function (obj) {
        //                if (obj) {
        //                    if (obj.completionGesture == "cancel") {
        //                        // user canceled, bad guy
        //                    } else {
        //                        // user really invited someone :)
        //                    }
        //                } else {
        //                    // user just pressed done, bad guy
        //                }
        //            },
        //            function (obj) {
        //                // error
        //                console.log(obj);
        //            }
        //        );
        //

    };


    //    $scope.share()


    $scope.invite = function () {

        
        // WORKING .

        facebookConnectPlugin.appInvite({
                url: "http://example.com",
                picture: "http://example.com/image.png"
            },
            function (obj) {
                if (obj) {
                    if (obj.completionGesture == "cancel") {
                        // user canceled, bad guy
                        alert(obj)
                    } else {
                        alert(obj)
                        // user really invited someone :)
                    }
                } else {
                    alert(obj)
                    // user just pressed done, bad guy
                }
            },
            function (obj) {
                // error
                alert(obj)
                console.log(obj);
            }
        );

    }

    $scope.doRefresh = function () {

        var feedSub = this.subscribe('userFeed');



        this.autorun(function () {
            if (feedSub.ready()) {
                var plays = Plays.find().fetch();
                var userIds = _.pluck(plays, 'usr')
                var userIds = _.flatten(userIds);
                var sub = this.subscribe('userAvatars', function () {
                    return [userIds]
                });

                $ionicLoading.hide()

            } else {

                $ionicLoading.show({
                    template: '<ion-spinner icon="spiral"></ion-spinner>'
                })
            }
        })


        this.helpers({
            feeds: () => {
                return Plays.find({}, {
                    sort: {
                        createdAt: -1
                    }
                });
            }
        });

        // Get Users Avatar 

        $scope.avatar = function (id) {
            var usr = id;
            var profile = Meteor.users.findOne({
                _id: usr
            })

            if (profile && profile.services && profile.services.twitter) {
                return profile.services.twitter.profile_image_url
            } else if (profile && profile.services && profile.services.facebook) {
                return "https://graph.facebook.com/" + profile.services.facebook.id + "/picture?width=200&height=200"
            } else {
                return 'img/defaultAvatar.jpg'
            }
        }

    }


    $scope.doRefresh();

}



angular.module('randomino').controller('Facebook', function ($scope, ezfb, $window, $location) {

    updateLoginStatus(updateApiMe);

    $scope.login = function () {
        /**
         * Calling FB.login with required permissions specified
         * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
         */
        ezfb.login(function (res) {
            /**
             * no manual $scope.$apply, I got that handled
             */
            if (res.authResponse) {
                updateLoginStatus(updateApiMe);
            }
        }, {
            scope: 'email,user_likes'
        });
    };

    $scope.logout = function () {
        /**
         * Calling FB.logout
         * https://developers.facebook.com/docs/reference/javascript/FB.logout
         */
        ezfb.logout(function () {
            updateLoginStatus(updateApiMe);
        });
    };

    $scope.share = function () {
        ezfb.ui({
                method: 'feed',
                name: 'angular-easyfb API demo',
                picture: 'http://plnkr.co/img/plunker.png',
                link: 'http://plnkr.co/edit/qclqht?p=preview',
                description: 'Start challenge against others and win discounts'
            },
            function (res) {
                // res: FB.ui response
            }
        );
    };

    /**
     * For generating better looking JSON results
     */
    var autoToJSON = ['loginStatus', 'apiMe'];
    angular.forEach(autoToJSON, function (varName) {
        $scope.$watch(varName, function (val) {
            $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
        }, true);
    });

    /**
     * Update loginStatus result
     */
    function updateLoginStatus(more) {
        ezfb.getLoginStatus(function (res) {
            $scope.loginStatus = res;

            (more || angular.noop)();
        });
    }

    /**
     * Update api('/me') result
     */
    function updateApiMe() {
        ezfb.api('/me', function (res) {
            $scope.apiMe = res;
        });
    }
});
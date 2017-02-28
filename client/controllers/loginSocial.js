angular.module('randomino').controller('loginSocial', loginSocial);

function loginSocial($scope, $state, $ionicPopup, $timeout, $ionicSideMenuDelegate, $reactive, $meteor) {


    // Disable Slide Menu 

    $reactive(this).attach($scope);

    this.autorun(() => {




        if (Meteor.userId()) {
            $timeout(function () {
                $state.go('app.feed');
            }, 400)

        }


    })


    $ionicSideMenuDelegate.canDragContent(false)



    $scope.facebookLogin = function () {



        options = {};
        if (Meteor.isCordova) {
            options.loginStyle = "redirect";
            options.redirectUrl = Meteor.absoluteUrl('_oauth/facebook');

            //  redirectUrl : 'http://app.tetrami.com/_oauth/facebook?close'
        }

        //
        //        $meteor.loginWithFacebook({
        //            loginStyle: "redirect"
        //        }, function (err) {
        //            if (!err) {
        //                //window.close();
        //                $timeout(function () {
        //                    $state.go('app.feed');
        //                }, 300);
        //
        //
        //            } else {
        //                var confirmPopup = $ionicPopup.confirm({
        //                    title: '<span class="black-text"> Login Error</span>',
        //                    template: '<span class="black-text">Login Error</span>'
        //                });
        //
        //            }
        //        });





        Meteor.loginWithFacebook(options);

    }


    $scope.twitterLogin = function () {


        toptions = {};
        if (Meteor.isCordova) {
            toptions.loginStyle = "redirect";
            toptions.redirectUrl = Meteor.absoluteUrl('_oauth/twitter');
        }
        
//        console.log('hamza')
        
        
        Meteor.loginWithTwitter({} , function(err){
            if(err){
                alert('login Error')
            }
        });
//
//        Meteor.loginWithTwitter({}, function (err) {
//            //        Meteor.loginWithTwitter({loginStyle: 'redirect'},function (err) {
//            if (!err) {
//                //window.close();
//                $timeout(function () {
//                    $state.go('app.feed');
//                }, 300)
//            } else {
//                var confirmPopup = $ionicPopup.confirm({
//                    title: '<span class="black-text"> Login Error</span>',
//                    template: '<span class="black-text">Login Error</span>'
//                });
//
//            }
//        });


    }

    $scope.instagramLogin = function () {

        Meteor.loginWithInstagram({
            loginStyle: 'redirect'
        }, function (err) {
            if (!err) {
                $timeout(function () {
                    window.close();
                    $state.go('app.feed');
                }, 500)
            } else {
                //                var confirmPopup = $ionicPopup.confirm({
                //                    title: '<span class="black-text"> Login Error</span>',
                //                    template: '<span class="black-text">Login Error</span>'
                //                });

                console.log('instagram error login')

            }
        });

    }
}
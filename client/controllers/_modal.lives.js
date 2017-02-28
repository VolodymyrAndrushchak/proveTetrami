// import facebook-native-login

//import {facebookConnectPlugin} from "../../cordova-plugin-facebook4"

//import  {facebookConnectPlugin} from "facebookConnectPlugin"
//



angular.module('randomino').controller('modalLives', modalLives);

function modalLives($scope, $state, $timeout, $ionicPopup) {
    //console.log('')

    $scope.answerSurvey = function () {
        $scope.modal.hide()
        $timeout(function () {
            $state.go('app.surveys')
                //$state.go('app.settings')
        }, 600)
    };


    $scope.watchAds = function () {
        $scope.modal.hide()
        $timeout(function () {
            $state.go('app.account')
        }, 600)
    };

    $scope.inviteFriends = function () {


        var options = {
            method: "feed",
            link: "http://example.com",
            caption: "Such caption, very feed."
        };


        // DO
        facebookConnectPlugin.appInvite({
                url: "http://tetrami.com",
                picture: "http://tetrami.com/image.png"
            },
            function (obj) {
                if (obj) {
                    if (obj.completionGesture == "cancel") {
                        // user canceled, bad guy
                        alert('cancel')
                    } else {
                        // user really invited someone :)
                        alert('invited')
                    }
                } else {
                    // user just pressed done, bad guy
                    alert('done without invition')
                }
            },
            function (obj) {
                // error
                console.log(obj);
            }
        );



        //
        //        facebookConnectPlugin.appInvite({
        //                url: "http://tetrami.com",
        //                picture: "http://tetrami.com/img/defaultAvatar.jpg"
        //            },
        //            function (obj) {
        //                if (obj) {
        //                    if (obj.completionGesture == "cancel") {
        //                        // user canceled, bad guy 
        //                    } else {
        //                        var confirmPopup = $ionicPopup.alert({
        //                            title: '<span class="black-text"> Invite Success</span>',
        //                            template: '<span class="black-text">You actually Invited someone</span>'
        //                        });
        //                    }
        //                } else {
        //                    // user just pressed done, bad guy 
        //                }
        //            },
        //            function (obj) {
        //                // error 
        //                console.log(obj);
        //                var confirmPopup = $ionicPopup.alert({
        //                    title: '<span class="black-text"> Err</span>',
        //                    template: '<span class="black-text">You actually Invited someone</span>' + obj
        //                });
        //            }
        //        );

    }
}
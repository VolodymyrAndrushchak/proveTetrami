var appClient = {}

appClient.avatar = function () {
    
    var profile = Meteor.user();
    if (profile && profile.services.twitter != undefined) {
        return profile.services.twitter.profile_image_url
    } else if (profile && profile.services.facebook != undefined) {
        return "https://graph.facebook.com/" + profile.services.facebook.id + "/picture?width=200&height=200"
    } else {
        return '/img/defaultAvatar.jpg'
    }
    
}

angular.module('randomino.controllers', ['ionic', 'ui.router'])

.controller('AppCtrl', function ($scope, $state, $ionicSideMenuDelegate, $timeout, $reactive, $ionicPopup, $ionicLoading, $rootScope) {

    $reactive(this).attach($scope);




    this.autorun(() => {
        var usr = Meteor.userId()

        var product = this.subscribe('mobProducts')

        // Images Subscribe once globally. ( FIX LATER )
        // Subscribe to only Published Products Images 
        var productImage = this.subscribe('productImages');

        var pages = this.subscribe('posts');



        // Open Meny if this is User Only.
        if (usr) {
            $ionicSideMenuDelegate.canDragContent(true)
        } else {
            $timeout(function () {
                $state.go('app.start');
            }, 400)
        }




        if (product.ready() || productImage.ready() || pages.ready()) {
            $ionicLoading.hide();
        } else {
            $ionicLoading.show({
                template: '<ion-spinner icon="spiral"></ion-spinner> <br/>'
            })
        }


        //Setting profile rootScope.
        if (Meteor.user() && Meteor.user().profile) {
            $rootScope.profile = Meteor.user().profile;
        }


        if (Meteor.user() && Meteor.user().services) {
            $rootScope.avatar = appClient.avatar();
        }


        // Setting Avatar as rootScope.

    })





    if (Meteor.isCordova) {
        this.autorun(function () {
            var statusBarVisible = StatusBar.isVisible;
            if (statusBarVisible) {
                StatusBar.hide();
            }
        })
        var gaScript = 'cordova/facebookConnectPlugin.js';
        DocHead.loadScript(gaScript);
    } else {
        console.log('Not Under Cordova')
    }









    $scope.doLogout = function () {
        Meteor.logout(function (err) {
            if (err) {
                console.log(err)
            }
        });
    }


    this.autorun(function (computation) {
        var statusWaiting = Meteor.status().status;
        if (statusWaiting === 'waiting' || statusWaiting === 'connecting') {
            $ionicLoading.show({
                template: '<ion-spinner icon="spiral"></ion-spinner> <br/>' + statusWaiting + ' <br> connection lost ...'
            })
            Meteor.setInterval(function () {
                Meteor.reconnect()
            }, 10000)
        } else {
            $ionicLoading.hide()

        }

    })



});
/*
    Challenge Start Combination Controller .
    
    TODO : Set the combination in temporary local database .
    StartPlay Update :
    == Check lives count for the player .
        == If has less than N* procced to SurveyTemplateChooser 
        == If not procced to the game play directly .

*/
//BotConfig = new Mongo.Collection()
import * as _ from 'underscore';

angular.module('randomino').controller('startChallange', startChallange);

function geSlideDataIndex(swipe) {
    var activeIndex = swipe.activeIndex;
    var slidesLen = swipe.slides.length;
    if (swipe.params.loop) {
        switch (swipe.activeIndex) {
        case 0:
            activeIndex = slidesLen - 3;
            break;
        case slidesLen - 1:
            activeIndex = 0;
            break;
        default:
            --activeIndex;
        }
    }
    return activeIndex;
}




function startChallange($scope, $rootScope, $ionicGesture, $reactive, $state, $ionicPopup, $stateParams, $ionicLoading, $timeout,$rootScope) {
    $reactive(this).attach($scope)

//    this.autorun(function () {
//        var activePlays = this.subscribe('activePlays');
//    })

    var comb = {}


    var firstSwiper = new Swiper('.firstSwiper', {
        initialSlide : 0,
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        loop : true,
        paginationClickable: false,
        spaceBetween: 4,
        direction: 'vertical',
        onSlideChangeEnd: function (swipe) {
            comb.first = geSlideDataIndex(swipe) 
        }
    });

    var secondSwiper = new Swiper('.secondSwiper', {
        initialSlide : 1,
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        loop : true,
        paginationClickable: false,
        spaceBetween: 4,
        direction: 'vertical',
        onSlideChangeEnd: function (swipe) {
            comb.seconed = geSlideDataIndex(swipe)
        }
    });

    var thirdSwiper = new Swiper('.thirdSwiper', {
        initialSlide : 2,
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        loop : true,
        paginationClickable: false,
        spaceBetween: 4,
        direction: 'vertical',
        onSlideChangeEnd: function (swipe) {
            comb.third = geSlideDataIndex(swipe)
        }
    });

    var forthSwiper = new Swiper('.forthSwiper', {
        initialSlide : 3,
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        loop : true,
        paginationClickable: false,
        spaceBetween: 4,
        direction: 'vertical',
        onSlideChangeEnd: function (swipe) {
            comb.forth = geSlideDataIndex(swipe)
        }
    });




    var challengeComb = [1,2,3,4]


    var setTempComb = {

        usr: Meteor.userId(),
        firComb: 1,
        secComb: 2,
        thiComb: 3,
        fortComb: 4,
        played: false
    }


    var tempCreated = TempComb.insert(setTempComb);





    //OLD swipe.
    //    $scope.swipeUp = function () {
    //        // Do whatever here to manage swipe left
    //        alert('SwipedUp')
    //    };



    var c = Deps.autorun(function (comp) {
        //... put reactive stuf on scope.....
        $scope.next = 0;
        if (!comp.firstRun) {
            // only do not do aply at first run becaulse then apply is already running.
            $scope.$apply()
        }
    });




    $scope.firComb = challengeData[0]
    $scope.secComb = challengeData[1]
    $scope.thiComb = challengeData[2]
    $scope.fortComb = challengeData[3]



    function roll(value, name) {
        var arrLen = challengeData.length;
        var elementPos = challengeData.map(function (x) {
            //console.log(x.value)
            return x.value;
        }).indexOf(value.value);
        var objectFound = challengeData[elementPos];
        if (elementPos == arrLen - 1) {
            $scope[name] = challengeData[0];
        } else {
            $scope[name] = challengeData[elementPos + 1];
        }
        var query = {};
        query[name] = value.value;
        TempComb.update(tempCreated, {
            $set: query
        })
        TempComb.update(tempCreated, {
            $set: {
                played: true
            }
        })
    }



    $scope.getNext = function (value, referTo) {

        roll(value, referTo);
    }

    // Start Play
    $scope.startPlay = function () {

        // Challenge Start Init , Play Start ( usr , ProductId , StartDate , createdAt , InitScore[getFromApp Default ] , combination)
        var f = TempComb.findOne(tempCreated);

        var product = Products.findOne($stateParams.productId)

        var play = {
            usr: Meteor.userId(),
            userImage: Meteor.user().profile.picture,
            userName: Meteor.user().profile.name || Meteor.user().profile.username || Meteor.user().username,
//            comb: [f.firComb, f.secComb, f.thiComb, f.fortComb],
            comb: [challengeComb[comb.first], challengeComb[comb.seconed] , challengeComb[comb.third] , challengeComb[comb.forth]],
            sIndex: [comb.first, comb.seconed , comb.third , comb.forth],
            productId: $stateParams.productId,
            kicked: false,
            statusActive: true,
            statusWon: false
        }

        play.productPrice = product.price;
        play.productDiscount = product.discount;
        play.productName = product.name;
        play.productDesc = product.desc;
        play.productStock = product.stock;
        play.productImage = product.mainImage;
        play.botPlay = false;
        play.score = 0;
        play.createdAt = new Date();
        play.startedAt = new Date();
        
        
        $rootScope.productPrice = product.price;
        $rootScope.productDiscount = product.discount;

        //console.log(play)


        // Setting Product Data Temporary.
        var product = Products.findOne($stateParams.productId);
        var playProduct = TempComb.findOne({
            type: 'product'
        });
        if (!playProduct) {
            product.type = 'product'
            TempComb.insert(product)
        } else {
            TempComb.remove({
                type: 'product'
            })
            product.type = 'product'
            TempComb.insert(product)
        }


        $ionicLoading.show({
            template: '<ion-spinner icon="spiral"></ion-spinner>'
        })

        $timeout(function () {
            $ionicLoading.hide()
        }, 500)


        Meteor.call('checkAndKickBack', play, function (err, result) {
            if (result) {
                if (result.playId) {
                    console.log(result)
                    $state.go('app.challenge-play', {
                        playId: result.playId
                    });

                } else if (result.kicked) {
                    console.log(result)
                    $rootScope.kicked = result.username
                    $state.go('app.challenge-failed-product', {
                        productId: $stateParams.productId
                    });
                }
            }
        })

        //        Meteor.call('startPlay', play, $stateParams.productId, function (err, result) {
        //            if (!err) {
        //
        //                $timeout(function () {
        //
        //                    if (result.playId) {
        //                        $state.go('app.challenge-play', {
        //                            playId: result.playId
        //                        });
        //
        //                    } else if (result.kicked == true) {
        //                        $state.go('app.challenge-failed-product', {
        //                            productId: $stateParams.productId
        //                        });
        //                    }
        //
        //                }, 500)
        //
        //                // Reset Combination Storage .
        //
        //                var setTempComb = {
        //                    //        usr: $rootScope.currentUser._id,
        //                    usr: Meteor.userId(),
        //                    firComb: 1,
        //                    secComb: 2,
        //                    thiComb: 3,
        //                    fortComb: 4,
        //                    played: false
        //                }
        //                var tempCreated = TempComb.insert(setTempComb);
        //                $timeout(function () {
        //                    $scope.firComb = challengeData[0]
        //                    $scope.secComb = challengeData[1]
        //                    $scope.thiComb = challengeData[2]
        //                    $scope.fortComb = challengeData[3]
        //
        //                }, 700)
        //
        //
        //
        //
        //            }
        //        })



    }



}
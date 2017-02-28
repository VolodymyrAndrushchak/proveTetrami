/*
    == Meteor Challange Play Controller 
    
    Check the challenge Play Status and kick to fail play .
    
    Stop the play by user and redirect to  challenge Won .
    
    
    Created  Autorun function for conitonus checking tasks .

*/

import * as _ from 'underscore';

angular.module('randomino').controller('challengePlay', challengePlay);

function challengePlay($scope, $reactive, $state, $stateParams, $timeout, $interval, $rootScope) {

    $reactive(this).attach($scope);


    var playParams = {}
    var timestamp = new Date();



    var auto = this.autorun((c) => {
        //var co = Chronos.update(100);
        //console.log(Chronos.moment(timestamp).fromNow());

        //        var gameKick = this.subscribe('gameKick', function () {
        //            return [$stateParams.playId];
        //        })
        //
        //        if (gameKick.ready()) {
        //
        //            var p = Plays.findOne($stateParams.playId);
        //            console.log('done')
        //            playParams.play = p;
        //            if (p.kicked == true) {
        //                $rootScope.kicked = p.kickedByName;
        //                $state.go('app.challenge-failed', {
        //                    playId: $stateParams.playId
        //                });
        //                c.stop()
        //            }
        //
        //        }
        //

        //
        var subscriptionPlay = this.subscribe('getPlay', function () {
            return [$stateParams.playId];
        });
        if (subscriptionPlay.ready()) {
            var p = Plays.findOne($stateParams.playId);
            if (p) {
                playParams.play = p;
                //                if (p.kicked == true) {
                //                    $rootScope.kicked = p.kickedByName;
                //                    $state.go('app.challenge-failed', {
                //                        playId: $stateParams.playId
                //                    });
                //                    c.stop()
                //                }
            }
        }
        //        
    });




    $scope.winPriceC = 0;
    $scope.newPriceC = $rootScope.productPrice;
    playParams.score = 0;
    playParams.scoreInc = 1;

    $rootScope.winPrice = 0;



    var clientBot = function () {
            _.each(_.range(0, 10), function () {

                //var T = _.random(1,4) * _.random(50, 170);
                var T = 7 * _.random(50, 500);

                botInit = $timeout(function () {
                    playParams.score = playParams.score + playParams.scoreInc
                    var newPrice = parseFloat($rootScope.productPrice) - ((parseFloat(playParams.score)) * parseFloat($rootScope.productDiscount));
                    var winPrice = parseFloat($rootScope.productPrice) - parseFloat(newPrice);
                    $scope.newPriceC = newPrice;
                    $scope.winPriceC = winPrice;
                    playParams.newPrice = newPrice;
                    playParams.winPrice = winPrice;

                }, T)

            })
        }
        // Run when the Template is rendered 
    clientBot()
        // Run every 2 secs.
    intervalBot = $interval(function () {
        if (playParams.scoreInc = 1) {
            clientBot()
        } else {
            return null
        }
    }, 2000)





    //WORKING Version
    intervalPromise = $interval(function () {
        // DDP/ autorun is late for 500 ms.
        if ($stateParams.playId) {
            Meteor.call('checkNewComb', $stateParams.playId, function (err, result) {
                if (result) {
                    if (result.kicked) {
                        //                        console.log('kicked');
                        //                        console.log(result);
                        $rootScope.kicked = result.username;

                        $state.go('app.challenge-failed', {
                            playId: $stateParams.playId
                        });
                    }
                }
            })
        } else {
            return null
        }
    }, 200);

    $scope.$on("$destroy", function () {        
        auto.stop();
        if (intervalPromise) {            
            $interval.cancel(intervalPromise);   
            $interval.cancel(intervalBot)
        }    
    });



    // Won Free .
    $scope.winFree = function () {
        Meteor.call('setWin', $stateParams.playId)
        $state.go('app.challenge-won', {
            productId: playParams.productId,
            playId: $stateParams.playId
        });
    }




    $scope.helpers({
        play: () => {
            return Plays.findOne({
                _id: $stateParams.playId
            });
        }
    })



    $scope.stopChallange = function (playId) {
        playParams.scoreInc = 0;
        $interval.cancel(intervalPromise);
        $interval.cancel(intervalBot);
        $rootScope.winPrice = playParams.winPrice;
        $rootScope.newPrice = playParams.newPrice;
        playParams.play.winPrice = playParams.winPrice;
        playParams.play.newPrice = playParams.newPrice;
        Meteor.call('stopPlay', playParams.play, function (err, result) {
            if (!err) {
                $state.go('app.challenge-won', {
                    productId: playParams.play.productId,
                    playId: $stateParams.playId
                });
            }
        })
    }

}
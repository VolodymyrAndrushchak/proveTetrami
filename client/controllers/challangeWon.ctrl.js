/*

    == Challenge Won .

        === Return the discount / score and how much time .
    
        === Set Play Again 
            == Get challengeId , productId ( create another Play ) => challangePlay ...
*/


angular.module('randomino').controller('challengeWon', challengeWon);


function challengeWon($scope, $reactive, $rootScope, $state, $stateParams, $timeout, datetime) {


    $reactive(this).attach($scope);

    $scope.subscribe('getPlayWon', function () {
        return [$stateParams.playId];
    });


    // Subscribe function

    $scope.helpers({
        play: () => {
            return Plays.findOne($stateParams.playId)
        }


    })


    var toTime = moment(new Date()).add(10, 'minutes')

    //console.log(moment(new Date()).format("hh:mm:ss"))
    //console.log(moment(toTime).format("hh:mm:ss"))

    function timerIt() {
        var currentTime = new Date();
        var diff = moment(toTime).diff(currentTime, 'milliseconds', true)
        $scope.timer = diff;
        $scope.$apply();
    }


    setInterval(timerIt, 1000)



    $scope.imagexOld = function (id) {

        var ImageObj = Images.files.findOne(id)
        if (ImageObj) {
            return '/cfs/files/images/' + ImageObj._id + '/' + ImageObj.name
        };

    };




    $scope.imagex = function (id) {
        var ImageObj = Images.files.findOne(id)
        if (ImageObj) {
            return ImageObj.url({})
        };

    };


    $timeout(function () {
        $state.go('app.shop')
    }, 1000 * 60 * 10)


    $scope.playAgain = function () {
        $state.go('app.challenge-start', {
            productId: $stateParams.productId
        })
    }


    $scope.buyIt = function () {

        // GET PLAY ID / GET Challenge ID / Get ProductID 

        // UPDATE : New Price IF Play.won TRUE 


        var addToCart = {
            product: $stateParams.productId,
            playId: $stateParams.playId,
            createdAt: new Date(),
            usr: Meteor.userId()
        }


        $state.go('app.checkout', {
            playId: $stateParams.playId
        });

    }

}
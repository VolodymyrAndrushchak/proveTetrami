/*

    === Challenge Fail.


*/

angular.module('randomino').controller('challengeFailed', challengeFailed);

function challengeFailed($scope, $state, $stateParams, $reactive, $timeout, $ionicLoading, $timeout) {

    $reactive(this).attach($scope)

    this.subscribe('getPlay', function () {
        return [$stateParams.playId];
    });




    $scope.helpers({
        play: () => {
            return Plays.findOne($stateParams.playId);
        },
        localCollection : () => {
            return localCollection.findOne({type:'local'})
        }

    });


    

    var names = ['Can', 'Ahmet', 'Elif', 'Eyman', 'Nehir', 'Nisanur', 'Aysa', 'Furkan', 'Mert', 'Enes', 'Ayşe', 'Ayşegül', 'Serhat', 'Onur']




    $scope.playAgain = function (product) {


        var productState = $stateParams.productId

        if (product) {


            $state.go('app.challenge-start', {
                productId: product
            });
        } else if (productState) {

            $state.go('app.challenge-start', {
                productId: productState
            });
        }
    }




    $scope.$on('$ionicView.enter', function () {
        // Code you want executed every time view is opened



        $ionicLoading.show({
            //template: 'Playing...'
            template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>'
        })
        var rendomNo = Math.floor(Math.random() * names.length)

        var setRandomName = names[rendomNo]

        $scope.kickedByCx = setRandomName
        
        $timeout(function () {
            $ionicLoading.hide()
            
        }, 20)

    })








}
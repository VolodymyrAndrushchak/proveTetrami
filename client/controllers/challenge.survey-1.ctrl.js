/*

    Challenge Survey in the Game Loop .
    
    
    Get from Challange after setting combination !
    
    
    $stateParams : Challenge ID 
    $stateParams : => Pass it to survey Template .
    $stateParams : => click on skip - pass to pass and start the game .
    
    
    

*/


angular.module('randomino').controller('challangeSurvey', challangeSurvey);


function challangeSurvey($scope, $stateParams) {
    
    
    // Get ProductId and playId 


    $scope.answer = function () {
        
        // Pass to Survey Template with Params { playId , productId }


    }


    $scope.pass = function () {
        // Pass to { playId } and Activate the Task

    }

}
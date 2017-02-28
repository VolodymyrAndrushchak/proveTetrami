/*
    Pages Controller 
    
    
    TODO : 
    
        Sort Pages by Order .


*/



angular.module('randomino').controller('pageCtrl', pageCtrl);

function pageCtrl($scope, $stateParams, $reactive) {
    $reactive(this).attach($scope);
    $scope.helpers({
        page: () => {
            return Posts.findOne($stateParams.pageId);
        }
    })
}
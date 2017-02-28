angular.module('randomino').controller('pagesCtrl', pagesCtrl);

function pagesCtrl($scope,  $reactive) {
    $reactive(this).attach($scope);
        $scope.helpers({
         pages: () => {
                return Posts.find({type : "page"}, {sort :{"order" : 1}})
            }
        });    
};
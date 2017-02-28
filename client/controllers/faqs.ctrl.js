/*
    Faqs Controller 
    
    
    TODO : 
    
        Sort Faqs by Order .


*/





angular.module('randomino').controller('FAQCtrl' , FAQCtrl);
                                       
                                       
function FAQCtrl($scope , $reactive ){
    
    $reactive(this).attach($scope)
    $scope.helpers({
            groups: () => {
                 return Posts.find({type : "faq"}, {sort :{"order" : 1}})
            }
        })
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };

    
    
}                                       
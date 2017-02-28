/*
    Setting Language for the user .
    
    Push to The userConfigs Collection at the server .

*/

angular.module('randomino').controller('languageSetting', languageSetting);

function languageSetting($scope, $meteor, $rootScope, $reactive ,$translate) {

    //$scope.value = 'en';

    $reactive(this).attach($scope);

    
    
    this.subscribe('userSettings');

    // Current Language for User Lang .

    $scope.helpers({
        lang: () => {
//            return UserSettings.findOne({
//                usr: Meteor.userId()
//            })
            
            
             return Meteor.user();
        }
    })


    // ng-change for the radio button
    $scope.setLang = function (value) {
        // console.log(lang)

        var userLang = {
            usr: Meteor.userId(),
            lang: value
        }

        //console.log(UserSettings.findOne({usr : $rootScope.currentUser._id}))



        $meteor.call('setUserLang', userLang, function (err) {
            if (!err) {
                console.log('done')
            }
        })
        
        
        $translate.use(value);


    }

    // Scope Watch Testing for Value 
    //    $scope.$watch('value', function (value) {
    //        console.log(value);
    //    });

}
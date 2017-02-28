angular.module('randomino').filter('yesNo', function () {
    return function (boolean) {
        return boolean ? 'Yes' : 'No';
    }
})
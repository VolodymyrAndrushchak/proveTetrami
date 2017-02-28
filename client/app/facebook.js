//Dropped Using FB SDK instead 
angular.module('randomino').config(function (ezfbProvider) {
    ezfbProvider.setLocale('en_GB');
    ezfbProvider.setInitParams({
        appId: '260811884283460',
        version: 'v2.4'

    });
});
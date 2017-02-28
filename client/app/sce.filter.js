angular.module('randomino').filter('trust', ['$sce',
    function ($sce) {
        return function (value, type) {
            // Defaults to treating trusted text as `html`
            return $sce.trustAs(type || 'html', text);
        }
    }
  ]);


angular.module('randomino').filter('unsafe', function($sce) { return $sce.trustAsHtml; });


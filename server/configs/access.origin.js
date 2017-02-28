//// Remove StatusBar if Cordova.
//Meteor.startup(function () {
//    console.log('Configuring content-security-policy:');
//
//
//    BrowserPolicy.content.allowOriginForAll('meteor.local');
//    BrowserPolicy.content.allowOriginForAll('http://localhost:3000');
//    BrowserPolicy.content.allowOriginForAll('http://*.tetrami.com');
//    BrowserPolicy.content.allowOriginForAll('https://*.stripe.com');
//
//
//    //    BrowserPolicy.content.allowEval();
//    //    BrowserPolicy.framing.disallow();
//    //    BrowserPolicy.framing.restrictToOrigin('localhost:3000');
//
//});
//
//
//var result = HTTP.call("GET", "http://web.tetrami.com/api/comb/[1,3,3,1]", {});
//console.log(result.content)
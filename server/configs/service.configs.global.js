ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.remove({
    service: 'twitter'
});


ServiceConfiguration.configurations.remove({
    service: 'instagram'
});

ServiceConfiguration.configurations.remove({
    service: 'facebookx'
});



ServiceConfiguration.configurations.remove({
    service: 'twitterx'
});

ServiceConfiguration.configurations.remove({
    service: 'facebookLocal'
});
//
//
//Meteor.startup(function () {
//    // detect environment by getting the root url of the application
//    console.log(JSON.stringify(process.env.ROOT_URL));
//
//    // or by getting the port
//    //console.log(JSON.stringify(process.env.PORT));
//
//    // alternatively, we can inspect the entire process environment
//    //console.log(JSON.stringify(process.env));
//});


// Server Testing Tetrami App
ServiceConfiguration.configurations.insert({
    service: 'facebookx',
    appId: '1795401254033945',
    secret: 'f42d8da185de99f9483e47b6fa93297c',
    loginStyle: "redirect",
    //    redirectUrl : "http://appx.randomino.net/_oauth/facebook?close"
});


// LocalTesting

ServiceConfiguration.configurations.insert({
    service: 'facebookLocal',
    appId: '548578498596920',
    secret: '29856b364abecc1776c24475c49405da',
    loginStyle: "redirect",
    redirectUrl: "http://localhost:3000/_oauth/facebook?close"
});


// Server Twitter Login 
ServiceConfiguration.configurations.insert({
    service: 'twitterx',
    consumerKey: 'qwbfVt5p3ioInbaYPkTHAYVj8',
    secret: 'ixOprxSJgXTIbv3HLEnCwPh6DTp4tpVkrTt26VFsVz8g87YyIa',
    loginStyle: "redirect",
    redirectUrl: "http://appx.randomino.net/_oauth/twitter"
});


//// Server Twitter Login 
//ServiceConfiguration.configurations.insert({
//    service: 'twitter',
//    consumerKey: 'qwbfVt5p3ioInbaYPkTHAYVj8',
//    secret: 'ixOprxSJgXTIbv3HLEnCwPh6DTp4tpVkrTt26VFsVz8g87YyIa',
//    loginStyle: "redirect",
//    redirectUrl: "http://appx.randomino.net/_oauth/twitter"
//});









ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1066246320119526',
    secret: '02a17ee4bad011f9c78aab56ef64b119',
    loginStyle: "redirect",
    redirectUrl: "http://app.tetrami.com/_oauth/facebook?close"
});



// Server Twitter Login 
//ServiceConfiguration.configurations.insert({
//    service: 'twitter',
//    consumerKey: 'U5BtzYXXbTWo9dmDdUTQdXtvj',
//    secret: '9RHaEWuviNrsepQwhHl8wddzubDyAc6SVp5PZO5UR7elIAXUe0',
//    loginStyle: "redirect",
//    redirectUrl: "http://app.tetrami.com/_oauth/twitter?close"
//});


// Instagram hamzamu account / Randomino App
ServiceConfiguration.configurations.insert({
    service: 'instagram',
    scope: 'basic',
    clientId: '9978c439aa664bc1b92a2ea0e6ea0fb2',
    secret: '8068f9ba0fdd41df89efd9d9e58caa00'
});
//


//var v = ServiceConfiguration.configurations.find().fetch()

//console.log(v)



var environment, settings;

//environment = process.env.METEOR_ENV || "development";

var RootUrl = process.env.ROOT_URL;
var DDPUrl = process.env.MOBILE_DDP_URL;


//console.log(RootUrl)
//console.log(DDPUrl)
//console.log(environment)

//
//if (!process.env.METEOR_SETTINGS) {
//    console.log("No METEOR_SETTINGS passed in, using locally defined settings.");
//
//    if (RootUrl === "http://app.randomino.net") {
//
//        //Meteor.settings = settings.production;
//        console.log('Production -- service.configs.global.js server/config')
//
//
//        ServiceConfiguration.configurations.insert({
//            service: 'facebook',
//            appId: '1066246320119526',
//            secret: '02a17ee4bad011f9c78aab56ef64b119'
//        });
//
//
//
//        // Server Twitter Login 
//        ServiceConfiguration.configurations.insert({
//            service: 'twitter',
//            consumerKey: 'U5BtzYXXbTWo9dmDdUTQdXtvj',
//            secret: '9RHaEWuviNrsepQwhHl8wddzubDyAc6SVp5PZO5UR7elIAXUe0'
//        });
//
//
//        // Instagram hamzamu account / Randomino App
//        ServiceConfiguration.configurations.insert({
//            service: 'instagram',
//            scope: 'basic',
//            clientId: '9978c439aa664bc1b92a2ea0e6ea0fb2',
//            secret: '8068f9ba0fdd41df89efd9d9e58caa00'
//        });
//
//
//
//
//
//    } else if (RootUrl === "http://localhost:3000") {
//
//        // Meteor.settings = settings.staging;
//
//
//        ServiceConfiguration.configurations.insert({
//            service: 'facebook',
//            appId: '548578498596920',
//            secret: '29856b364abecc1776c24475c49405da'
//        });
//
//
//
//        //        console.log('Staging')
//    } else {
//        console.log('Development' + 'service.config.global')
//            //Meteor.settings = settings.development;
//
//
//        // facebook app : Impact101 Development  Local Working
//
//
//
//
//    }
//    //console.log("Using [ " + environment + " ] Meteor.settings");
//}
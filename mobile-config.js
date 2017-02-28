App.info({
    name: 'Tetrami',
    description: 'Play and Shop',
    author: 'HAMZA Studio Team',
    email: 'bizmimar@gmail.com',
    website: 'http://bizmimar.com',
    id: 'com.tetrami.istanbul',
    version: '0.0.1',
});


App.icons({
    'iphone_2x': 'mobile/icons/Icon-120.png',
    'iphone_3x': 'mobile/icons/Icon-180@3x.png',
    'android_mdpi': 'mobile/android/drawable-mdpi/icon.png',
    'android_hdpi': 'mobile/android/drawable-xhdpi/icon.png',
    'android_xhdpi': 'mobile/android/drawable-xxhdpi/icon.png',
    'android_xxhdpi': 'mobile/android/drawable-xxhdpi/icon.png',
    'android_xxxhdpi': 'mobile/android/drawable-xxxhdpi/screen.png'
});

App.launchScreens({
    'iphone_2x': 'mobile/splash/ios/Default-568h@2x~iphone_640x1136.png',
    'iphone5': 'mobile/splash/ios/Default-568h@2x~iphone_640x1136.png',
    'iphone6': 'mobile/splash/ios/Default-750@2x~iphone6-portrait_750x1334.png',
    'android_mdpi_portrait': 'mobile/android/drawable-mdpi/screen.png',
    'android_hdpi_portrait': 'mobile/android/drawable-xhdpi/screen.png',
    'android_xhdpi_portrait': 'mobile/android/drawable-xxhdpi/screen.png',
    'android_xxhdpi_portrait': 'mobile/android/drawable-xxhdpi/screen.png',
    'android_xxhdpi_portrait': 'mobile/android/drawable-xxxhdpi/screen.png'
});


App.accessRule('https://api.stripe.com/*');
App.accessRule('https://checkout.stripe.com');
App.accessRule('http://web.tetrami.com/*');
//App.accessRule("*");


App.setPreference('StatusBarOverlaysWebView', 'true');
App.setPreference('StatusBarBackgroundColor', '#000000');
App.setPreference('Fullscreen', 'true');
App.setPreference('fullscreen', 'true');
App.setPreference('SplashScreenDelay', '100');
App.setPreference('FadeSplashScreenDuration', '100');
App.setPreference('FadeSplashScreen', 'false');





App.configurePlugin('cordova-plugin-facebook', {
    FACEBOOK_APP_ID: '260811884283460',
    FACEBOOK_DISPLAY_NAME: 'Tetrami'
});

App.configurePlugin('cordova-plugin-facebook4', {
    APP_ID: '260811884283460',
    APP_NAME: 'Tetrami'
});

App.configurePlugin('com.phonegap.plugins.facebookconnect', {
    APP_ID: '260811884283460', // <- Your appId
    APP_NAME: 'Tetrami' // <- Your app_name
});

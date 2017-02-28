Accounts.onCreateUser(function (options, user) {
    user.profile = options.profile || {};
    //Twitter returns some useful info as the username and the picture

    user.profile.username = user.username;
    user.profile.name = user.username;

    user.profile.createdAt = new Date();


    user.profile.lang = appConfig.defaultLang;

    user.profile.lives = appConfig.startLives;

    user.profile.livesUpdatedAt = null;


    if (user.services.twitter) {
        user.profile.picture = user.services.twitter.profile_image_url_https;
        user.profile.name = user.services.twitter.screenName;
    }
    
    
    if (user.services.twitterx) {
        user.profile.picture = user.services.twitterx.profile_image_url_https;
        user.profile.name = user.services.twitterx.screenName;
        user.profile.username = user.services.twitterx.screenName;
    }

    if (user.services.facebook) {
        
        user.profile.name = user.services.facebook.name
        user.profile.picture = "https://graph.facebook.com/" + user.services.facebook.id + "/picture?width=200&height=200";

//        console.log('facebook User')
    }
    if (user.services.facebookx) {
        
        user.profile.name = user.servicesx.facebook.name
        user.profile.picture = "https://graph.facebook.com/" + user.servicesx.facebook.id + "/picture?width=200&height=200";

//        console.log('facebook User')
    }

    if (user.services.instagram) {

        user.profile.picture = "services.instagram.profile_picture";

        console.log('instagram User')
    }

    if (!user.profile.picture) {


        user.profile.picture = 'imagesCommon/defaultAvatar.jpg';

    }


    // Deprcated .
    //    var userConfigs = {
    //        usr: user._id,
    //        language: appConfig.defaultLang,
    //        registrationPoints : 5,
    //        defaultLives : 50,
    //        createdAt : new Date(),
    //        modifiedAt : new Date()
    //    }
    //    
    //    
    //    
    //    UserSettings.insert(userConfigs , function(err){
    //        console.log('New User Created : ' +  user.profile.name)
    //        console.log('New User Settings Created : ' +  userConfigs )
    //    })
    return user;
});
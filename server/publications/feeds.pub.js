Meteor.publish('userFeed' , function(){
        
    return Plays.find({statusWon : true}, {sort : {createdAt : -1} , limit : 5})
    
});


Meteor.publish('userAvatars', function (imagesIds) {

    // secure publishing only updated twitterProfileImage / facebook UI 

    return Meteor.users.find({
        _id: {
            $in: imagesIds
        }
    }, {
        fields: {
            "username": 1,
            "profile": 1,
            "services.facebook.name": 1,
            "services.facebook.username": 1,
            "services.twitter.profile_image_url": 1,
            "services.facebook.id": 1,

        }
    })

});
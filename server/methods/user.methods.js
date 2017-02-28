/*
    New Mobile User

*/


Meteor.methods({
    updateUserInfos: function (usr) {

        var user = Meteor.users.update(usr.usr, {
            $set: {
                'profile.username': usr.username,
                'profile.name' : usr. name,
                'profile.email' : usr.email
            }
        });
    }
})
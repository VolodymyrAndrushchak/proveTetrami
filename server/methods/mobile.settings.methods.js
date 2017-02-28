// Insert default configs in default strcture when user create an account 


Meteor.methods({


    setUserLang: function (userLang) {




        var user = Meteor.users.update(userLang.usr, {
            $set: {
                'profile.lang': userLang.lang
            }
        });


    },

    setUserAddress: function (userData) {


        if (this.userId) {

            var user = Meteor.users.update(this.userId, {
                $set: {
                    'profile.address': userData
                }
            });
        }else{
            
            return null
            
        }





    },

    getLanguage: function (usr) {
        var user = Meteor.users.findOne(usr);
        if (user && user.profile) {
            return user.profile.lang
        }
    }
})
/*


    Populate Bot Players.



*/

var avatar = _.range(33);

var BotPlayersNames = ['Hakan', 'Umut', 'Rustom', 'Ahmet', 'Nazliy' , 'Atkin' , 'Musa Demir'];


var BotPlayers = Meteor.users.find({
    'profile.system': true
}).count()



//console.log(BotPlayers)

if (BotPlayers < 5) {
    _.each(BotPlayersNames, function (name) {
        var randomEmail = faker.internet.email();
        var randomName = _.sample(BotPlayersNames);
        var userName = _.sample(BotPlayersNames);
        var setAvatar = _.sample(avatar)


        var createUser = Accounts.createUser({
            username: name,
            profile: {
                name: name,
                image: _.range(33),
                lives: 50,
                system: true,
                playActive: false
            },
            email: randomEmail,
            password: 'password'
        });

        //console.log(createUser)
    });
};

//console.log(BotPlayers)
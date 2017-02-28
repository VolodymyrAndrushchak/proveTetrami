/*





*/




//import '/server/simulation/simulation.engine.functions.js';
//Simulation.batchPlay();


//Simplay.remove({});




Bot = {
    init: function () {


        
        // Old Bot Closed for NEW BOT .
        var players = this.BotPlayers(5);

        this.BotPlays(players);
        this.BotPlayClose()



        // Closing Plays



        //SimCollect.SimPlaysFetch()


        //this.getStats()


    },
    BotPlayers: function (count) {

        // Pick [n] Players .

        var players = [];


        // Get only active Players

        var BotUsers = Meteor.users.find({
            'profile.system': true,
            'profile.playActive': false
        }, {
            limit: 5
        }).fetch();


        //        console.log(BotUsers)

        _.each(BotUsers, function (user) {
            players.push(user._id);
        })

        //console.log(players)
        return players


    },
    BotPlays: function (players) {

        //        // Get players .. Generate Plays evern  run every [ random T ] 



        var productRandom = Simulation.getRandomProduct();

        _.each(players, function (player) {

            var T = 6000 * _.random(1, 5);

            Meteor.setTimeout(function () {

                var play = {
                    usr: player,
                    createdAt: new Date(),
                    comb: Simulation.randomComb(),
                    startedAt: new Date(),
                    statusActive: true,
                    statusEnd: null,
                    productName: productRandom.name,
                    productPrice: productRandom.price,
                    productDiscount: productRandom.discount,
                    productStock: productRandom.stock,
                    bplay: true,
                    score: 0

                }


                //console.log(play)

                var botPlayerName = Meteor.users.findOne(player).username

                console.log('### Bot Play Started by Bot Player : ' + botPlayerName + ' ####')

                // Start Simulation Play
                //Simulation.startPlay(play);

                // Start Bot Play
                Bot.botPlay(play)
                PlayFunctions.setCounter()



            }, T)


            // End _.each    

        })


    },

    botPlay: function (play) {
        // Set play / compare plays if Play does not exist save it

        var setReturn = {};


        var user = play.usr;
        var comb = play.comb;



        var oldUserWithComb = Plays.findOne({
            comb: play.comb,
            statusActive: true

        }, {
            usr: {
                $nin: play.usr
            }
        });


        var playId = this.createPlay(play);

        if (oldUserWithComb) {
            // Update this Play with active:false , endAt : new Date()
            //return null // temp

            //console.log('old exist')

            //var playCreated = Plays.insert(play)
            //setReturn.playId = oldUserWithComb;


            setReturn.kickedPlayerName = Meteor.users.findOne(oldUserWithComb.usr).username
            setReturn.kickedbyName = Meteor.users.findOne(play.usr).username

            // console.log('play params : ' + play.usr + ' : ' + play.comb)
            //    console.log('playOld  params : ' + oldUserWithComb.usr + ' : ' + oldUserWithComb.comb)

            //console.log('********')
            console.log('Player : ' + setReturn.kickedPlayerName + ' has kicked : ' + setReturn.kickedbyName + '  with same combination : ' + play.comb)

            //console.log('********')

            setReturn.kickedPlayer = oldUserWithComb.usr;
            setReturn.kickedby = play.usr;
            setReturn.playComb = play.comb;
            setReturn.livedFor = oldUserWithComb.createdAt;
            //setReturn.createdAt = new Date();
            setReturn.bPlay = play.bplay;





            // close the session of the old user ( statusActive:true + playEndAt:new Date() + send the oldUser Notification and setScore k)
            Plays.update(oldUserWithComb, {
                $set: {
                    statusActive: false,
                    statusWon: false,
                    playEndAt: new Date(),
                    kickedBy: play.usr,
                    kickedbyName: PlayFunctions.getUserName(play.usr),
                    kicked: true
                }
            });


            Plays.update(playId, {
                $set: {
                    statusActive: false,
                    statusWon: false,
                    playEndAt: new Date(),
                    kickedBy: oldUserWithComb.usr,
                    kickedbyName: PlayFunctions.getUserName(play.usr),
                    kicked: true
                }
            });


            // It's not needed to insert as long it's kickedOut .


            // Simulation for Bot .
            // Put Conditional if Sumlation Start

            Simplay.update(oldUserWithComb, {
                $set: {
                    statusActive: false,
                    statusWon: false,
                    playEndAt: new Date(),
                    kickedBy: play.usr,
                    kicked: true
                }
            });

            Simplay.update(playId, {
                $set: {
                    statusActive: false,
                    statusWon: false,
                    playEndAt: new Date(),
                    kickedBy: oldUserWithComb.usr,

                }
            });


            //console.log('Match found : play lost')



        } else {

            // Creating a play in the Database 

            Bot.createPlay(play)



        }

        // Simulation.saveLogs(setReturn)
        // return setReturn;


    },

    createPlay: function (play) {


        var playCreated = Plays.insert(play, function (err) {
            if (!err) {
                console.log('BotPlay Inserted - Combination : ' + play.comb);
            }
        })


        var SimActive = Sim.findOne({
            type: 'config'
        })

        if (SimActive.active == true) {
            Simplay.insert(play, function (err) {
                if (!err) {
                    console.log('Sim BotPlay Inserted - Combination : ' + play.comb);
                }
            })
        }
        return playCreated
    },

    BotPlayClose: function () {
        // Need To Reset Players from Methods when closing the CronJob.

        // Min req. to close the BPlay.
        var min = _.random(2, 4);

        var time = new Date((new Date()) - min * 1000 * 60)

        Simplay.update({
            createdAt: {
                $lt: time
            },
            statusActive: true,

            bplay: true
        }, {
            $set: {
                statusActive: false,
                playEndAt: new Date(),
                playEnd: true
            }
        }, {
            mutli: true
        }, function (err) {
            if (!err) {
                console.log('BPlays Closed')
            }
        })



        // Close Bot Play
        Plays.update({
            createdAt: {
                $lt: time
            },
            statusActive: true,

            bplay: true
        }, {
            $set: {
                statusActive: false,
                playEndAt: new Date()
            }
        }, {
            mutli: true
        }, function (err) {
            if (!err) {
                console.log('BPlays Closed')
            }
        })

    },

    getStats: function () {


        // Get Status in the console.


        var results = [];

        function addMinutes(date, minutes) {
            //    return new Date(date.getTime() - minutes * 60000);
            return new Date(date.getTime() - minutes * 60000);
        }

        _.each(_.range(1, 7), function (n) {

            var now = new Date();
            var label = addMinutes(now, n);
            //    var min = addMinutes(now, (n - 1));
            var max = addMinutes(now, n - 2);


            var cc = new Date((new Date()) - 1000 * 60 * n);

            var count = Simplay.find({
                statusActive: true,
                createdAt: {
                    $lt: new Date((new Date()) - 1000 * 60 * n)
                }
            }).count();




            var data = {
                label: addMinutes(now, n),
                //                count2: cu,

                //        one: addMinutes(now, 2 ),
                //        now : new Date(),
                //        min: min,
                //        max: max,
                count: count
            }

            //            console.log(data)

            results.push(data)

        });

    }
}

//Bot.BotPlayers(5)
/*


Simulation
    
    
    
    Collections
        Sim  ONE : {playersCount , freq , currentPlayers[] } , result {combinationLost , currentCombination,WinningsTotal}
        SimPlay
        SimLogs
        SimProducts.
        
        
        Use => current Products Collection .
        
        
        
        
    Populate
    
        SimConfig.
        Users.
        Products .
        
        
    Publication
    
    
    
    Create Sim Config .
    Create 300 fake users .
    
    
    
    Fetch Data 
        Users who does not play .
        
        Users Playing => submit to an array at Sim : currentPlayers []
        
                User lose combination => remove from Sim 
            
            userToPlay : Get users who are not in currentPlayers [] Get one 
        
            
        
    
    
    Functions 
    
        - Generate play . play : {} insert play => check /compare and  kick matched combination player => if not kicked after certain time { setTimeout : } WIN + save to SimLogs .
        - Play includes { product._id , product.price , product.discount , product.newprice , product.winPrice }
    
    
    
    Cron jobs 
        - Run every { random } a  { no of } plays .


    Methods to start
        Init Job



    
    
*/

//import '/server/simulation/simulation.data.js';

var getDuration = function (createdAt, endAt) {
    var created = createdAt.getTime()
    var finished = endAt.getTime()

    var duration = finished - created




    function getDurationCount(millisec) {
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        //return minutes + ":" + seconds;
        return minutes;
    }


    return getDurationCount(duration)
}




//Simulation.batchPlay();

Simulation = {

    init: function () {
        //onsole.log(value)
        //var randomV = this.randomInt(10, 100)
        //console.log(randomV)

        //console.log(this.randomComb())
        var play = this.setPlay()
        this.startPlay(play);

        this.activePlayers();

        this.closePlays();


        //Close Play

        //SimCollect.SimPlaysFetch()


    },
    liveChange: function (usr, value) {

        Meteor.users.update(usr, {
            $inc: {
                "profile.lives": value
            }
        });
    },
    randomComb: function () {
        var setComb = [this.randomInt(1, 5), this.randomInt(1, 5), this.randomInt(1, 5), this.randomInt(1, 5)];
        console.log(setComb)
        return setComb
    },

    activePlayers: function () {

        var currentPlayers = Simplay.find({
            statusActive: true
        }).count();


        var botPlays = Simplay.find({
            statusActive: true,
            bplay: true
        }).count()


        //console.log()


        Sim.update({
            type: 'config'
        }, {
            $set: {
                currentPlayers: currentPlayers,
                botsPlays: botPlays
            }
        })




    },
    getRandomProduct: function () {


        var products = Products.find({}).fetch()
        var randomProduct = _.sample(products);

        return randomProduct;

    },

    getRandomPlayer: function () {
        var usersCount = Meteor.users.find({
            'profile.fake': true,
            'profile.playActive': false
        }, {
            limit: 60
        }, {
            profile: 0
        }).fetch();

        var getUser = _.sample(usersCount);


        return getUser._id
    },

    setPlay: function () {

        var userRandom = this.getRandomPlayer();
        var productRandom = this.getRandomProduct();

        var play = {
            usr: userRandom,
            createdAt: new Date(),
            comb: this.randomComb(),
            startedAt: new Date(),
            statusActive: true,
            productName: productRandom.name,
            productPrice: productRandom.price,
            productDiscount: productRandom.discount,
            productStock: productRandom.stock,
            playerName: Meteor.users.findOne(userRandom).username,
            score: 0,
            bplay: false


        }


        return play

    },

    startPlay: function (play) {
        // Set play / compare plays if Play does not exist save it

        var setReturn = {};


        var user = play.usr;
        var comb = play.comb;





        // Function Set .

        // Match with BotPlay 

        var MatchBot = Bot.matchPlayer(play.comb)


        if (!MatchBot) {

            // Match Kick Update Insert (play)



            // Creating the new Play
            // Used to kick and record 


            var oldUserWithComb = Simplay.findOne({
                comb: play.comb,
                statusActive: true

            }, {
                usr: {
                    $nin: play.usr
                }
            });


            //this.createPlay(play)





            if (oldUserWithComb) {


                setReturn.kickedPlayerName = Meteor.users.findOne(oldUserWithComb.usr).username
                setReturn.kickedbyName = Meteor.users.findOne(play.usr).username

                // console.log('play params : ' + play.usr + ' : ' + play.comb)
                //    console.log('playOld  params : ' + oldUserWithComb.usr + ' : ' + oldUserWithComb.comb)

                console.log('********')
                console.log('Player : ' + setReturn.kickedPlayerName + ' has kicked : ' + setReturn.kickedbyName + '  with same combination : ' + play.comb)

                //console.log('********')

                setReturn.kickedPlayer = oldUserWithComb.usr;
                setReturn.kickedby = play.usr;
                setReturn.playComb = play.comb;
                setReturn.livedFor = oldUserWithComb.createdAt;
                setReturn.createdAt = new Date();
                setReturn.bPlay = play.bplay;



                // close the session of the old user ( statusActive:true + playEndAt:new Date() + send the oldUser Notification and
                //setScore k)



                Simplay.update(oldUserWithComb, {
                    $set: {
                        statusActive: false,
                        statusWon: false,
                        playEndAt: new Date(),
                        kickedBy: play.usr,
                        kicked: true,
                        kickedPlayerName: setReturn.kickedPlayerName,
                        kickedbyName: setReturn.kickedbyName,
                        duration: getDuration(oldUserWithComb.createdAt, new Date())
                    }
                });




                // It's not needed to insert as long it's kickedOut .

                var playCreated = Simplay.insert(play)

                var playNew = Simplay.findOne(playCreated)

                Simplay.update(playCreated, {
                    $set: {
                        statusActive: false,
                        statusWon: false,
                        playEndAt: new Date(),
                        kickedBy: oldUserWithComb.usr,
                        kickPlay: true,
                        kicked: true,
                        kickedbyName: setReturn.kickedPlayerName,
                        duration: getDuration(playNew.createdAt, new Date())

                    }
                });


                //console.log('Match found : play lost')



            } else {


                this.createPlay(play)


            }

            // this.saveLogs(setReturn)
            return setReturn;
        } else {
            // created play and kickedout 
            console.log('==== MatchedBot =====')
            
            var playCreated = this.createPlay(play);


            Simplay.update(playCreated, {
                $set: {
                    statusActive: false,
                    statusWon: false,
                    playEndAt: new Date(),
                    kickedBy: 'system',
                    kickPlay: true,
                    kicked: true,
                    kickedbyName: setReturn.kickedPlayerName,
                    duration: 0

                }
            });
            
            console.log('==== Player Kicked By Bot =====')

            

        }


    },

    // Is not needed anymore
    createPlay: function (play) {
        var playCreated = Simplay.insert(play, function (err) {
            if (!err) {
                console.log('Simplay Inserted - Combination : ' + play.comb);
            }
        });

        // Setting counters 
        Simulation.setCounter()
    },



    saveLogs: function (log) {


        //console.log(log)
        Simlogs.insert(log, function (err) {
            if (!err) {
                'SimLogs Inserted  : saveLogs'
            }
        });



    },
    closePlays: function () {


        var min = _.random(1, 4);
        var time = new Date((new Date()) - min * 1000 * 60)

        //        console.log('randomClosePlay : ' + min)

        //        Simplay.update({
        //            createdAt: {
        //                $lt: time
        //            },
        //            statusActive: true
        //        }, {
        //            $set: {
        //                statusActive: false,
        //                playEndAt: new Date(),
        //                win :true ,
        //                kicked : false 
        //            }
        //        }, {
        //            mutli: true
        //        }, function (err) {
        //            if (!err) {
        //                console.log('Plays stop by user : Simulation ')
        //            }
        //        })

    },

    randomInt: function (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    },

    generateLog: function (key, value) {
        console.log(key + ' : ' + value);
    },

    batchPlay: function (players, freq) {
        //        console.log('s')


    }


}



Simulation.setCounter = function () {



    var activePlays = Simplay.find({
        statusActive: true
    }).fetch()


    //
    //    var activePlaysCount = Simplay.find({
    //        statusActive: true
    //    }).count()

    //console.log('SimSetCounter : setcounter ' + activePlaysCount);


    _.each(activePlays, function (activePlay) {


        var newPrice = parseFloat(activePlay.productPrice) - (activePlay.score * parseFloat(activePlay.productDiscount));

        var winPrice = parseFloat(activePlay.productPrice) - parseFloat(newPrice);




        Simplay.update(activePlay._id, {

            $inc: {
                score: 1
            }
        }, function (err) {
            if (err) {
                console.log('Simulation setCounter engine.js' + err)
            }
        })


        //playOp = Plays.findOne(activePlay._id)

        //console.log('activePlaysCount')
        //console.log(activePlay.productPrice + ' : ' + activePlay.productDiscount + ' : ' + activePlay.score + ' : ' + newPrice)

        //var playDump = Simplay.findOne(activePlay._id);

        //console.log('Simplay Score' + playDump.score)

        //console.log(playOp)
    })



    //    console.log('-----')
}

//export Simulation ;

//export  Simulation = Simulation;
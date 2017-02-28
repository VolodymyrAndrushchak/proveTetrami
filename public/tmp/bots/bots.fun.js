/*

    New Bot function
    
    
    
    Generate Bots Comb
    
    Update Bot Comb
    
    Match Bot Comb with Play.comb return true or false 
    
    
    SyncdCron Update for Bot . check every 5 mins .
    
    -- Check users count = n .
    -- generate / update new combs arr for n .
    
    

*/





Meteor.publish(null, function () {
    return BotConfig.find()
})



// For Testing run and disable BOT cron 
SyncedCron.start();


var sec = 400 ;

var BotConfigBase = {
    type: 'botBase',
    combs: [],
    createdAt: new Date(),
    modifiedAt: new Date()
}

// TESTING  Cron


// Disabled ON Mobile Just Active On Web
// // Check Users and Update 
 SyncedCron.add({
     name: 'BotCheck',
     schedule: function (parser) {
         // parser is a later.parse object
         
         
         return parser.text('every 2 secs');
     },
     job: function () {
 
         //Bot.SyncdCronUpdate()
         
         Bot.generator()
 
         //console.log('*****Bot Check*****')
 
     }
 });



//

//SyncedCron.add({
//    name: 'BotSyncUpdate',
//    schedule: function (parser) {
//        // parser is a later.parse object
//        return parser.text('every 5 secs');
//    },
//    job: function () {
//
//        //Bot.SyncdCronUpdate()
//
//        //console.log(BotConfig.find().fetch())
//
//        console.log('*****Bit syncUpdate*****')
//
//    }
//});







if (BotConfig.find().count() == 0) {
    var insertBotConfig = BotConfig.insert(BotConfigBase, function (err) {
        if (!err) {
            console.log('config inserted')
        }
    })
}



//import './bots.engine.js'



//Bot.setSec = 8;



Bot.botCombArr = [];



Bot.currentBotCombs = null;




/*

    Bot Generator 
    
*/

Bot.generator = function () {

    // Generate combination 



    // generate combinations and kick  for an x numbers

    // console.log(_.range(0 ,5))

    // 4 times * 4 qs = 16 queries 
//
//    var currentPlayers = Plays.find({
//        statusActive: true
//    }).count()



//
//    if (currentPlayers == 0) {
//
//        //Bot.setSec = (_.random(100))
//
//        console.log('users number 0')
//            //console.log('bot.fun.js | activePlayer 0 DO NOTHING  ' + currentPlayers)
//
//    } else {

    console.log(_.range(0, 10))
        _.each(_.range(0, 10), function () {

            //            var T = 100 * _.random(1, 500);
            var T = 7 * _.random(50, 300);

            Meteor.setTimeout(function () {

                Meteor.wrapAsync(PlayFunctions.setCounter())

                var comb = Simulation.randomComb();

                Bot.checkBotnKick(comb)
                // check and kick Play
                Bot.checkKick(comb)

            }, T)

            //console.log(comb)

        })

//    }

    // insert if not .


    return null

}





Bot.GenerateCallBack = function () {
    var comb = Simulation.randomComb();

    

    Bot.checkBotnKick(comb)

    // Check if exist 




    // check and kick Play
    Bot.checkKick(comb)

}

// Generate Combination and push it to But Pool match it with 



/*

    Check current oriented  functiosn for bot for unqie Combination .

*/



Bot.checkBotnKick = function (comb) {



    // q =  2




    // Check against 




    //var combs = Bot.botCombArr;




    //
    //
    //
    //    var isContain = _.where(combs, comb)
    //
    //
    //
    //
    //
    //    if (isContain != 0) {
    //
    //        Meteor.wrapAsync(Bot.generator())
    //        
    //        _.without(Bot.botCombArr, comb)
    //
    //        //console.log('Exist / Removed : Exist : Combs Length : ' + Bot.botCombArr.length)
    //
    //
    //
    //
    //    } else {
    //
    //        combs.push(comb)
    //
    //
    //        //console.log('DOES NOT ESIST / Pushed : Combs Length : ' + Bot.botCombArr.length)
    //    }
    //    


    
//    console.log('bot comb new : ' + comb)
    var ifExist = BotConfig.findOne({
        combs: {
            $in: [comb]
        }
    });


    if (ifExist) {
        //console.log('exits')

        // Removed Temporary for Testing
        //Meteor.wrapAsync(Bot.generator())

        Bot.GenerateCallBack()

        Bot.pullComb(comb)

    } else {
        
        
        //console.log('does not exits')
        BotConfig.update({
            type: 'botBase'
        }, { $addToSet: {combs:  comb  } }, function (err) {
            if (!err) {
                console.log('pushed to Bot Pool')
            }
        });


        




    }
    //


}



Bot.checkPlayWithBot = function (comb) {


    // DB approach !

    var isExist = BotConfig.findOne({
        combs: {
            $in: [comb]
        }
    });


    
    console.log('bots/bot.fun.jsdoes : exist or not : ' + isExist)




    // If exist Kick . if not return false 
    if (isExist) {
        console.log('exist Play With Bot exist' + isExist)



        // REMOVED Temporary 

        //Meteor.wrapAsync(Bot.pullComb(comb))
        // Remove
        Bot.pullComb(comb)

        return true

    } else {
        // Important if return false insert .
        
        
        return false
    }



    //    var combs = Bot.botCombArr ;
    //
    //
    //    var isContain = _.where(combs, comb)
    //
    //
    //
    //
    //
    //    if (isContain != 0) {
    //
    //        
    //        
    //        _.without(Bot.botCombArr, comb)
    //
    //        
    //
    //        return true
    //
    //
    //    } else {
    //
    //        combs.push(comb)
    //
    //
    //        return false
    //    }







}






Bot.pullComb = function (comb) {

    console.log('bot pull remove ')

    BotConfig.update({
        type: 'botBase'
    }, {
        $pull: {
            combs: comb
        }
    }, function (err) {
        if (err) {
            console.log('comb pulled | but.fun.js err : ' + err)
        }
    })


}


//console.log(range)

Bot.generateCombArr = function (n) {

    var range = _.range(1, n || 100);

    //console.log(range.length)
    var combArr = []
    _.each(range, function (comb) {
        // generate combination 

        var combination = Simulation.randomComb()
            //console.log(comb)

        // push combination to combArr 
        combArr.push(combination)
    })

    //console.log(combArr)
    return combArr;
}



// To Be added

Bot.updateBot = function (n) {
    var combs = Bot.generateCombArr(n || 50);
    //console.log(combs)


    var currentPlayers = Plays.find({
        statusActive: true
    }).count()


    // get Players last check from BotConfig 

    // IF the list is not over oldValue + 50 do not run update .... 


    BotConfig.update({
        type: 'botBase'
    }, {
        $set: {
            combs: combs,
            playersLastCheck: currentPlayers
        }
    }, function (err) {
        if (err) {
            console.log('err @ : bot.fun.js' + err)
        }
    });





}

Bot.matchPlayer = function (play) {


    // check against player combination 

    //var comb = [3, 2, 3, 7]

    var isCombExist = BotConfig.findOne({
        combs: {
            $elemMatch: {
                $eq: play
            }
        }
    })


    if (isCombExist) {
        //console.log('true')

        return true
    } else {
        //console.log('does not exist')
        return false

    }
}



Bot.SyncdCronUpdate = function () {
    // Check Current Players / Sim / Play 
    //    var currentPlayersSim = Simplay.find({
    //        statusActive: true
    //    }).count()


    var currentPlayers = Plays.find({
        playActive: true
    }).count()

    var combNo = {};


    var x = parseInt(currentPlayers)


    switch (true) {
    case (x < 50):
        // Testing not 100
        combNo.comb = 100
        break;
    case (x > 0 && x < 100):
        combNo.comb = 300;
        break;
    case (x > 100 && x < 200):
        combNo.comb = 200;
        break;
    case (x > 200 && x < 300):
        combNo.comb = 100
        break;
    case (x == 300 && x > 300):
        combNo.comb = 0
        break;
    default:
        combNo.comb = 0
        break;

    }


    console.log('Active Players Count -  bot.fun.js : ' + currentPlayers)
    console.log('generateCobi No -  bot.fun.js :' + combNo.comb)

    Bot.updateBot(combNo.comb)


    // calculate the current number if no of users less than 50 set n = 200 bots combination 
    // if currenPlayersCount < 100 =
}




// Match Play Combination 

/*
    checkPlayWithBot 
    
    just one function to check the type of query and release 
    
    
    

*/


//For testing purpose only 



//


// Important for BotPlay and Challenge Play { Plays Collection }

Bot.checkKick = function (comb) {


    // q = 2

    // search the active plays for this combination 

    // kick those players 






    // Check if there active player Playing 
    var isInPool = Plays.findOne({
        statusActive: true,
        comb: comb
    })

    // check if exist in Game Pool 


    // IMPORTANT . kick player
    if (isInPool) {


        var isInPoolUpdate = Plays.update(isInPool, {
            $set: {
                statusActive: false,
                kickedBy: Bot.generateName(),
                kicked: true,
                playEndAt : new Date()
            }
        }, function (err) {
            if (err) {
                console.log('updated err Bot.Fun.js')
            }
        })

        Meteor.wrapAsync(isInPoolUpdate)


        // Return True if it exists and updated => set to kick player .

        return true


    } else {

        // SET COUNTER Score +1


        // if does not exist return false 
        return false
    }


}




Bot.generateName = function () {
    var names = ['Can', 'Ahmet', 'Elif', 'Eyman', 'Nehir', 'Nisanur', 'Aysa', 'Furkan', 'Mert', 'Enes', 'Ayşe', 'Ayşegül', 'Serhat', 'Onur']

    return _.sample(names)
}




// Test Only
//Bot.updateBot()

//Bot.matchPlayer()
//Simulation.init()
//Bot.SyncdCronUpdate()
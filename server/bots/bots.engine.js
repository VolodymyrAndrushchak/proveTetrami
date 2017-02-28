/*

    New Bot function
    
    Generate Bots Comb
    
    Update Bot Comb
    
    Match Bot Comb with Play.comb return true or false 
    
    SyncdCron Update for Bot . check every 5 mins .
    
    -- Check users count = n .
    -- generate / update new combs arr for n .   

*/


// Start Cron. // Display when deployed on Mobile.
//SyncedCron.start()


Bot = {}




// TESTING  Cron

// Check Users and Update 
SyncedCron.add({
    name: 'BotCheck',
    schedule: function (parser) {
        // parser is a later.parse object

        // 2 secs

        //        return parser.text('every 200 mins');
        return parser.text('every 2 secs');
    },
    job: function () {

        //Bot.SyncdCronUpdate()




        Bot.generator()

        //console.log('*****Bot Check*****')

    }
});






//Bot Configuration.
BotConfig.remove({})


var sec = 400;

var BotConfigBase = {
    type: 'botBase',
    combs: [],
    createdAt: new Date(),
    modifiedAt: new Date()
}
if (BotConfig.find().count() == 0) {
    var insertBotConfig = BotConfig.insert(BotConfigBase, function (err) {
        if (err) {
            console.log('config insertion error : bot.engine' + err)
        }
    })
}


Bot.botCombArr = [];
Bot.currentBotCombs = null;




/*

    Bot Generator 
    
*/

Bot.generator = function () {

    // Generate combination 
    // generate combinations and kick  for an x numbers

    _.each(_.range(0, 10), function () {
        var T = 7 * _.random(50, 300);
        Meteor.setTimeout(function () {
            PlayFunctions.setCounter()
            var comb = appServer.randomComb();
            // check if Comb exists in Bot Pool : Kick if exists (Player,Bot) , insert if Not .
            Bot.checkBotnKick(comb)
            Bot.checkKick(comb)

        }, T)

    })

}



// Bot.CallBack function. if The combination exist kickit 

Bot.GenerateCallBack = function () {
    // Get another combination
    var comb = appServer.randomComb();
    // ChecknKick Bot Play
    Bot.checkBotnKick(comb)
        // check and kick Real Play
    Bot.checkKick(comb)
}

/*

    Check current oriented  functiosn for bot for unqie Combination .

*/

Bot.checkBotnKick = function (comb) {
    // convert to in Memory _.
    var ifExist = BotConfig.findOne({
        combs: {
            $in: [comb]
        }
    });
    //console.log('checkBotnKick : ' + ifExist)
    if (ifExist) {
        // Generate another combination
        Bot.GenerateCallBack()
            // Remove the old Bot Combination from Bot pool.
        Bot.pullComb(comb)
    } else {
        // If Not exist insert it in the bot pool.
        BotConfig.update({
            type: 'botBase'
        }, {
            $addToSet: {
                combs: comb
            }
        }, function (err) {
            if (err) {
                console.log('checkBotnKick : pushed to Bot Pool')
            }
        });
    }

}



// Important for BotPlay and Challenge Play { Plays Collection }
// Player X Player Match n Kick .
Bot.checkKick = function (comb) {

    var isInPool = Plays.findOne({
        statusActive: true,
        comb: comb
    })

    console.log('checkKick' + comb)

    // check if exist in Game Pool 
    if (isInPool) {

        console.log('############# BOT KICK PLAYER ##############')

        var name = Bot.generateName()

        Plays.update(isInPool, {
            $set: {
                statusActive: false,
                kickedBy: name,
                kicked: true,
                message: 'Oops! You are kicked  by : ' + name,
                playEndAt: new Date(),

                statusWon: false,
            }
        }, function (err) {
            if (err) {
                console.log('updated err Bot.Fun.js')
            }
        })

        // Return True if it exists and updated => set to kick player .
        return true
    } else {
        // SET COUNTER Score +1
        // if does not exist return false 
        return false
    }


}


//Not used.
Bot.checkPlayWithBot = function (comb) {


    // DB approach !

    var isExist = BotConfig.findOne({
        combs: {
            $in: [comb]
        }
    });
    // If exist Kick . if not return false 
    if (isExist) {
        //console.log('exist Play With Bot exist' + isExist)
        // REMOVED Temporary 
        Bot.pullComb(comb)
        return true

    } else {
        // Important if return false insert .
        return false
    }
}





// Pull a combination from the array.
Bot.pullComb = function (comb) {

    // console.log('bot pull remove ')

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






Bot.generateCombArr = function (n) {

    var range = _.range(1, n || 100);
    var combArr = []
    _.each(range, function (comb) {
        var combination = appServer.randomComb()
        combArr.push(combination)
    })
    return combArr;
}



// To Be added

Bot.updateBot = function (n) {
    var combs = Bot.generateCombArr(n || 50);

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
    // check new inserted Bot's Combination against player combination 
    var isCombExist = BotConfig.findOne({
        combs: {
            $elemMatch: {
                $eq: play
            }
        }
    })
    if (isCombExist) {
        return true
    } else {
        return false

    }
}



Bot.SyncdCronUpdate = function () {
    // Check Current Players / Sim / Play 
    // Change  the number of Bot Combinations in case of number of players change.
    var currentPlayers = Plays.find({
        playActive: true
    }).count()
    var combNo = {};
    var x = parseInt(currentPlayers)
    switch (true) {
    case (x < 50):
        // Testing not 100
        combNo.comb = 100;
        break;
    case (x > 0 || x < 100):
        combNo.comb = 300;
        break;
    case (x > 100 || x < 200):
        combNo.comb = 200;
        break;
    case (x > 200 || x < 300):
        combNo.comb = 100
        break;
    case (x == 300 || x > 300):
        combNo.comb = 0
        break;
    case (x == 800 || x > 800):
        combNo.comb = 800
        break;
    default:
        combNo.comb = 0
        break;
    }
    console.log('Active Players Count -  bot.engine.js : ' + currentPlayers)
    console.log('generateCobi No -  bot.engine.js :' + combNo.comb)
    Bot.updateBot(combNo.comb)
}


/*
    checkPlayWithBot     
    just one function to check the type of query and release 
    
*/

// Generate Random Names
Bot.generateName = function () {
    var names = ['Can', 'Ahmet', 'Elif', 'Eyman', 'Nehir', 'Nisanur', 'Aysa', 'Furkan', 'Mert', 'Enes', 'Ayşe', 'Ayşegül', 'Serhat', 'Onur']

    return _.sample(names)
}
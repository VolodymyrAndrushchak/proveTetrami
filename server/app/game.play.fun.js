/*




    - In methods while adding a Play 
        -
    = check the users matching array in challange and kick the olders createdValue of them 
        - play Stop
        - Challenge updated with score .
        - Update Log 


*/

PlayFunctions = {}
PlayFunctions.liveChangeOut = function (usrId, value) {

    Meteor.users.update(usrId, {
        $inc: {
            "profile.lives": value
        }
    });

}

PlayFunctions.setDiscount = function (productId, playId) {
    // Set only when Play is finished change later to setDiscount(play)
    //ToBeRemoved

    var survived = Plays.find({
        statusActive: true
    }).count();

    var product = Products.findOne(productId)
    var newPrice = parseFloat(product.price) - (survived * parseFloat(product.discount));
    var winPrice = parseFloat(product.price) - parseFloat(newPrice)
    return {
        newPrice: newPrice.toFixed(2),
        winPrice: winPrice.toFixed(2)
    }

}

PlayFunctions.setLogsFeed = function (data) {
    //deparcted
    Logs.insert(data, function (err) {
        if (err) {
            console.log('Log Error  : game.play.fun.js')
        }
    })


}


PlayFunctions.getUserName = function (usr) {
    var userName = Meteor.users.findOne(usr);
    if (userName.username) {
        return userName.username;
    } else {
        return userName.profile.name
    }
}




// Run setCounterSim to set score +1 for all active players when new player/Bot enter the game pool .

PlayFunctions.setCounter = function () {

    Plays.update({
        statusActive: true
    }, {
        $inc: {
            score: 1
        }
    }, {
        multi: true
    }, function (err) {
        if (err) {
            console.log('GamePlayFun.js : PlaysUpdated :' + err)
        }
    })

}


// Run setCounterSim to set score +1 for all active players when new player/Bot enter the game pool . (aimed for Simulation)
PlayFunctions.setCounterSim = function () {
    Simplay.update({
        statusActive: true
    }, {
        $inc: {
            score: 1
        }
    }, {
        multi: true
    }, function (err) {
        if (err) {
            console.log('GamePlayFun.js : Simplay Closed :' + err)
        }
    })
}


// Update Plays of Win or Lost
PlayFunctions.updatePlay = function (playId, options) {

    Plays.update(playId, {
        $set: options
    });

}


// Check if there is play has the same combination or not .
PlayFunctions.checkPlayerPlays = function (options) {
    // options {comb , usr}
    var play = Plays.findOne({
        comb: options.comb,
        statusActive: true
    }, {
        usr: {
            $nin: options.usr
        }
    });

    if (play) {
        return play
    } else {
        return false
    }

}
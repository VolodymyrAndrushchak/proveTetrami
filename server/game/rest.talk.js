Rest = {}


Rest.checkCombination = function (comb) {

    var checkBot = this.checkBot(comb)
    var checkPlay = this.checkPlay(comb)

    if (!!checkBot && !!checkBot) {
        return true
    } else if(checkPlay){
        console.log('rest.checkCombination')   
        //console.log(checkPlay)   
        return checkPlay
    }

}

Rest.checkBot = function (comb) {
    var isExist = BotConfig.findOne({
        combs: {
            $in: [comb]
        }
    });
    if (isExist) {
        this.botPullComb(comb)
        return true
    } else {
        return false
    }
}

Rest.botPullComb = function (comb) {

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


// Not with the same user :)  EDIT and Customize.
Rest.checkPlay = function (comb) {
    var play = Plays.findOne({
        comb: comb,
        statusActive: true
    });
    if (play) {
        
        return play
    } else {
        return false
    }
}



Rest.kickPlayer = function (id,player) {
    Plays.update({
        _id: id
    }, {
        $set: {
            statusActive: false,
            kicked : true,
            kickedByName : player
        }
    }, function (err) {
        if (!err) {
            console.log('PlayerKicked')
        }
    })
}


//{ qty: { $nin: [ 5, 15 ] } }

Rest.checkActivePlay = function (comb , usr) {
    var play = Plays.findOne({
        comb: comb,
        statusActive: true ,
        usr : {$ne: usr}
    }, {
        fields: {
            _id: 1,
            userName: 1
        }
    });
    if (play) {
        return play
    } else {
        return false
    }
}
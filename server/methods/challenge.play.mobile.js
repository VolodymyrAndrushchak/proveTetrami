Game = {}


Game.checkAPI = function (comb) {
    var result = HTTP.call("GET", "http://web.tetrami.com/api/comb/" + comb, {});
    return result
}





Meteor.methods({
    startPlayMobile: function (play) {
        // WILL BE changed Later ( ONLY client )
        
        // Dropped.

        var comb = JSON.stringify(play.comb)
        var result = Game.checkAPI(comb)
        if (result && result.content) {
            var result = JSON.parse(result.content)
            if (result.value == 'unique') {
                var newPlay = Plays.insert(play)
                result.playId = newPlay
            }

            return result
        } else {
            var err = {
                value: "error",
                message: "there is a connection error"
            }
        }

    },

    checkPlayConmbination: function (play) {
        //Dropepd
        var comb = JSON.stringify(play.comb)
        var result = Game.checkAPI(comb)
        if (result && result.content) {
            console.log(result.content)
            var result = JSON.parse(result.content)
            if (result.value == 'exists') {
                result.kicked = true
            }

            return result
        } else {
            var err = {
                value: "error",
                message: "there is a connection error"
            }
        }
    },

	// On Start Play Event
    checkAndKickBack: function (play) {
        //WORKING
//        console.log(play)
        
        PlayFunctions.liveChangeOut(play.usr , -1)
        var result = {}
        var checkPlay = Rest.checkCombination(play.comb)
        if (checkPlay) {
            result.kicked = true;
            //update Play Here .
            if (checkPlay.userName) {
                Rest.kickPlayer(checkPlay._id,play.userName)
                result.username = checkPlay.userName;
            }
        } else {
            var newPlay = Plays.insert(play)
            result.playId = newPlay
        }
        return result
    },
    checkNewComb: function (id) {
        var result = {}
            //var checkPlay = Rest.checkCombination(play.comb)

//        if (!result.kicked) {
//            
//            var botcheck = Rest.checkBot(play.comb);
//            var playCheck = Rest.checkActivePlay(play.comb, play.usr)
//
//            if (botcheck || playCheck) {
////                console.log(botcheck)
////                console.log(playCheck)
//                console.log('Kicked.....0000')
//                result.kicked = true;
//                if (playCheck.userName) {
//                    result.player = playCheck.userName;
//                }
//            }
//        }
        
        
        var play = Plays.findOne(id)
        
        if(play.kicked){
//            console.log('kicked Method')
            result.kicked = true;
            result.username = play.kickedByName ;
        }

        return result
    }
})
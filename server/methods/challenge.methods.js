/*




    - In methods while adding a Play 
        -
    = check the users matching array in challange and kick the olders createdValue of them 
        - play Stop
        - Challenge updated with score .
        - Update Log 
        
        
        Same as Mobile .



§   - fixed .

*/



//import '/server/game.play.fun.js';

// getDuration

Meteor.methods({


    startPlay: function (play, productId) {
        // to return data but it might not be needed .
        // Move to AppServer Function Then Run into 
        // Get uit only WHEN saving the Play.
        var setReturn = {};
        //console.log(play)

        //Play : check the play combination stop the old player [ statusOpen : false ] = {evaluate user , createdAt , started or Not , active:true }
        setReturn.comb = play.comb;
        // -1 lives .
        PlayFunctions.liveChangeOut(play.usr, -1);
        // Find Player with the same Combination as Before .
        // Get Old Play with the Same Combination
        var oldUserWithComb = PlayFunctions.checkPlayerPlays({
            comb: play.comb,
            usr: play.usr
        });
        // Start Check if it Mathch Any BOT Combination.
        var isBotMatch = Bot.checkPlayWithBot(play.comb)
        if (isBotMatch) {
            // Play / Save Combination and Set Return 
            // Starting Counting
            // End Counting Function
            //setReturn.playId = playCreated;
            // kick without DB save.            
            setReturn.kicked = true;
            setReturn.message = 'Oops! You bumped into : ' + Bot.generateName();
        } else {
            // IF 
            if (oldUserWithComb) {
                // kick the new play .
                setReturn.kicked = true;
                setReturn.playId = playCreated;
                setReturn.kickedBy = PlayFunctions.getUserName(oldUserWithComb.usr)
                setReturn.message = 'Oops! You bumped into : ' + setReturn.kickedBy

                // Disabled.
                //var playCreated = Plays.insert(play)
                // close the session of the old user ( statusActive:true + playEndAt:new Date() + send the oldUser Notification and setScore k)
                // SEND it from the client
                var newPlayerName = PlayFunctions.getUserName(play.usr)
                    // Update Old Play
                var updateOptionsOld = {
                    kicked: true,
                    statusActive: false,
                    statusWon: false,
                    playEndAt: new Date(),
                    kickedBy: newPlayerName,
                    kickedByName: newPlayerName,
                    message: 'Oops! You are kicked out by : ' + newPlayerName
                }

                PlayFunctions.updatePlay(oldUserWithComb, updateOptionsOld)


            } else {
                // Product.Data Get and Save.
                play.productId = productId;
                //play.cartItem = activeChallange.cartItemId;
                // Unnessasry submit from front-end 
                var product = Products.findOne(productId);
                
                play.productPrice = product.price;
                play.productDiscount = product.discount;
                play.productName = product.name;
                play.productStock = product.stock;
                play.productImage = product.mainImage;
                play.botPlay = false;
                play.score = 0;
                play.createdAt = new Date();
                play.startedAt = new Date();
                play.statusActive = true;
                
                var playCreated = Plays.insert(play)
                setReturn.playId = playCreated;
                setReturn.kicked = false;

            }
            // end else.

        }
        // end isBotMatch
        return setReturn

    },

    // Wining Play

    stopPlay: function (play) {
        // Diff from WEB .

        // Get Nick Name 
        
        Plays.update(play._id, {
            $set: {
                statusWon: true,
                statusActive: false,
                checkoutReady: true,
                winAt: new Date(),
                playEndAt: new Date(),
                winPrice: play.winPrice,
                newPrice: play.newPrice,
                won: true,
                //nickname: nickname
            }
        }, function (err) {
            if (err) {
                console.log('challenge.methods.mob.js' + err);
            }
        });


    },
    // if the Play reach 00 price . WonFree
    setWin: function (play, usrname) {

        Plays.update(play, {
            $set: {
                statusWon: true,
                statusActive: false,
                checkoutReady: true,
                winAt: new Date(),
                playEndAt: new Date(),
                winPrice: 0,
                newPrice: 0,
                won: true,
                wonFree: true,
                nickname: usrname,
                kicked: false,
                kickedBy: null,

            }
        }, function (err) {
            if (err) {
                console.log('challenge.methods.mob.js' + err);
            }
        });

    },
    timedOut: function (play) {

        Plays.update(play, {
            $set: {
                checkoutDisabled: true
            }
        })

    }

    
})
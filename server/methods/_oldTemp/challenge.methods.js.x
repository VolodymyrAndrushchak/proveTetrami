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




Meteor.methods({


    startPlay: function (play, productId) {

        // this.unblock();





        // to return data but it might not be needed .
        var setReturn = {};



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

        //console.log(play)


        //Play : check the play combination stop the old player [ statusOpen : false ] = {evaluate user , createdAt , started or Not , active:true }




        setReturn.comb = play.comb;
        setReturn.productId = product._id





        // - lives .
        PlayFunctions.liveChangeOut(play.usr, -1);


        // Find Player with the same Combination as Before .


        //PlayFunctions.checkPlayerPlays({comb : play.comb , usr : play.usr})


        var oldUserWithComb = PlayFunctions.checkPlayerPlays({
            comb: play.comb,
            usr: play.usr
        });


        // console.log(oldUserWithComb)



        // Start Check


        var isBotMatch = Bot.checkPlayWithBot(play.comb)




        if (isBotMatch) {



            // Play / Save Combination and Set Return 




            //console.log(play)
            //            console.log(play + 'p')

            //            var playCreated = Plays.insert(play)


            // Starting Counting


            // End Counting Function


            //            console.log('playInserted')


            //setReturn.playId = playCreated;
            setReturn.kicked = true;
//            setReturn.kickedBy = Bot.generateName();






            // SET counter Adding Score .
            //PlayFunctions.setCounter();





        } else {





            if (oldUserWithComb) {







                var playCreated = Plays.insert(play)

                setReturn.playId = playCreated;
                
                setReturn.kickedBy = PlayFunctions.getUserName(oldUserWithComb.usr)

                //console.log(setReturn.kickedBy)

                setReturn.kicked = true;

                // close the session of the old user ( statusActive:true + playEndAt:new Date() + send the oldUser Notification and setScore k)

                // NotINMobile = Get username once .
                // var kickedByName = Meteor.users.findOne(play.usr);


                // Old Duration 
                var oldDuration = getDuration(oldUserWithComb.createdAt, new Date())


                // Update play with options ! Replaced 



                var updateOptionsOld = {
                    kicked: true,
                    statusActive: false,
                    statusWon: false,
                    playEndAt: new Date(),
                    kickedBy: setReturn.kickedBy,
                    kickedByName: PlayFunctions.getUserName(play.usr),
                    duration: oldDuration
                }

                PlayFunctions.updatePlay(oldUserWithComb, updateOptionsOld)





                // Fix add to mobile .
                //var playData = Plays.findOne(playCreated)

                // Duration is NOt NEEDED as the User was just Kicked out .
                //var newDuration = getDuration(playData.createdAt, new Date())



                // TO BE REMOVED NOT NEEDED ANYMORE 
                //            
                //                var playCreated = Plays.insert(play)

                Plays.update(playCreated, {
                    $set: {
                        kicked: true,
                        statusActive: false,
                        statusWon: false,
                        playEndAt: new Date(),
                        kickedBy: oldUserWithComb.usr,
                        kickedByName: PlayFunctions.getUserName(oldUserWithComb.usr),
                        duration: 0
                    }
                });
                //
                //
                
                //


                // send Notification to The old User oldUserWithComb.usr 

                // send Notiftcaion to the new User play.usr 


                //console.log('kicked')







            } else {


                //console.log(play)
                //console.log(play)

                var playCreated = Plays.insert(play)


                // Starting Counting


                // End Counting Function





                setReturn.playId = playCreated;
                setReturn.kicked = false;



                // SET counter Adding Score .


                // REMOVED  For the New BOT ...
                //Bot.init()

                // send Notiftcaion to the new User play.usr 
            }


            // End else


            // Confirm kicked

            setReturn.kicked = true;






        }
        // end isBotMatch









        // Insert the new Play Database {challengeId , usr , startedAt , closedAt:null , combination }



        return setReturn





    },

    stopPlay: function (playId) {

        //this.unblock();



        // console.log(playId)

        // Needed for The logs 
        var play = Plays.findOne(playId);


        var newPrice = parseFloat(play.productPrice) - (play.score * parseFloat(play.productDiscount));

        var winPrice = parseFloat(play.productPrice) - parseFloat(newPrice);


        //console.log(winPrice + '' + newPrice + 'chan methods')


        // Count Discount how much !

        // Old absolute Couters is in the real time now
        //var newprice = PlayFunctions.setDiscount(play.productId, playId);



        var duration = getDuration(play.createdAt, new Date())

        Plays.update(playId, {
            $set: {
                statusWon: true,
                statusActive: false,
                checkoutReady: true,
                winAt: new Date(),
                playEndAt: new Date(),
                duration: duration,
                winPrice: winPrice,
                newPrice: newPrice,
                won: true

            }
        }, function (err) {
            if (err) {
                console.log('challenge.methods.mob.js' + err);
            }
        });


    }
})
/*




    - In methods while adding a Play 
        -
    = check the users matching array in challange and kick the olders createdValue of them 
        - play Stop
        - Challenge updated with score .
        - Update Log 


*/
//





PlayFunctions = {


    setDiscount: function (productId, playId) {




        // Calculate ..The survived combination Numbers 

        var survived = Plays.find({
            statusActive: true
        }).count();


        //console.log('survived : ' + survived)
        // Product

        var product = Products.findOne(productId)

        //console.log("Product : " + product.name)
        //console.log("Product discount : " + product.discount) // WORKING AT SERVER .
        //console.log("Product rate : " + product.discountrate) // DOES NOT WORK .

        // price-(esc*discount rate) = new price (edited)

        //var randomUsers = _.random(0, 100)

        //console.log('Users : in the pool { Simulation } in the system : ' + randomUsers)

        //        var newPrice = parseFloat(product.price)  - (randomUsers * parseFloat(product.discount));
        var newPrice = parseFloat(product.price) - (survived * parseFloat(product.discount));

        //console.log('test Parse ' + parseFloat(product.price))

        var winPrice = parseFloat(product.price) - parseFloat(newPrice)


        //console.log("Product Price : " + product.price)
        //console.log("Product discount price : " + newPrice)

        //console.log('------------------------')

        return {
            newPrice: newPrice.toFixed(2),
            winPrice: winPrice.toFixed(2)
        }


    },

    //old 
    setLogsFeed: function (data) {



        //console.log(data)

        Logs.insert(data, function (err) {
            if (err) {
                console.log('Log Error  : game.play.fun.js')
            }
        })


    },

    getNextSurvey: function (usr) {

        // Find if this answer this survey or not 

        // check in usrs [] array 

        // survey results inside the survey model 

        // ** Client side : if the user has lives less than 5 display survey template ( can work in challenge controller to pass to 2 routes set .)

    },
    getUserName(usr) {
        var userName = Meteor.users.findOne(usr);
        if (userName.username) {
            return userName.username;
        } else {
            return userName.profile.name
        }
    }


}





// Update all Score functions

/*





*/

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


/*


Aggregate Test 

*/




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


/*

    Update plays kick with type .
    
    once

*/


PlayFunctions.updatePlay = function (playId, options) {

    // SET SCORE if Kicked Out.


    Plays.update(playId, {
        $set: options
    });


}

PlayFunctions.checkPlayerPlays = function (options) {

    // options {comb , usr}


    var isExist = Plays.findOne({
        comb: options.comb,
        statusActive: true
    }, {
        usr: {
            $nin: options.usr
        }
    });

    if (isExist) {
        return isExist
    } else {
        return false
    }


}


// setting lives per user in actions : userID / value(1,2 OR -1)

PlayFunctions.liveChangeOut = function (usrId, value) {

    
    

    Meteor.users.update(usrId, {
        $inc: {
            "profile.lives": value
        }
    });
    
    

}
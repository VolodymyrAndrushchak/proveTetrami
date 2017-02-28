/*
    Publication for the Mobile App
    
    
    Feed .
    
    Products .
    
    
    Cart .
    
    
    Challenge .
    

    // User Settings Publish
    
        - User Data 
        - User Settings 
        
        - User Lives
    
    
    Current User : this.userId
*/


///



Meteor.publish('mobProducts', function () {
    // If the stock is 0 do not publish 
    return Products.find({
        published: true,
        stock : {$gt : 0}
    });
});


Meteor.publish('singleProduct', function (productId) {
    return Products.find({
        _id: productId ,
        stock : {$gt : 0}
    })
});



Meteor.publish('userChallenge', function () {
    // this user Challanges
    return Challenges.find({
        usr: this.userId
    })

});





Meteor.publish('userOrders', function () {
    // Return the current user Orders 
    return Orders.find({
        usr: this.userId
    })
});



Meteor.publish('userSettings', function () {
    return UserSettings.find({
        usr: this.userId
    })
})










Meteor.publish('getPlayWon', function (id) {

    return Plays.find({
        _id: id,
    })
})





///
Meteor.publish('kickedBy', function (id) {

    var play = Plays.findOne(id);

    return Meteor.users.find({
        _id: play.kickedBy
    });
})

//getPlayProduct

Meteor.publish('getPlayProduct', function (id) {


    return Products.find({
        _id: id
    })
})

//getCallange


Meteor.publish('getCallange', function (id) {



    return Challenges.find({
        _id: id
    });
})
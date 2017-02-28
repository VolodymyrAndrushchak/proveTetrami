/*

    DB Collecions 
    
    TEMP : Set from Mobile .
    
    Challanges , 
    Cart  , 
    Plays , 
    Score , 
    UserSettings ( Languages , Address  )

*/





// Cart Collection
Cart = new Meteor.Collection('cart');

// Challenges Collection per Cart Item 
Challenges = new Meteor.Collection('challenges')

//Plays Collection Records Score for Every Combination Play & Survey Score 
Plays = new Meteor.Collection('plays')


// Score : temp collection to record score for every player .

// TO BE REMOVED 
//Score = new Meteor.Collection('score')


//User Settings 
// TO BE REMOVED 
UserSettings = new Meteor.Collection('usersettings');


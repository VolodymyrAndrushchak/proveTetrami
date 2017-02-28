// subscribe Bot Arrays.
// Subscribe to Active Play combinations.
// Check and Kick at once .
localCollection = new Meteor.Collection(null)
TempComb = new Meteor.Collection(null);

var initData = {
    type : 'local',
    kickedUser : null
}

if(localCollection.find().count() == 0 ){
    localCollection.insert(initData)
}
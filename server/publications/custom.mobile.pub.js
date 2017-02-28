/*




*/


// Survey Polls
Meteor.publish('PollOne' , function(){
    var usr = this.userId ;
//    this.autorun(function (computation) {
    return Polls.find({ answered: { $nin: [usr] } }, {limit : 1});         
//    });
});



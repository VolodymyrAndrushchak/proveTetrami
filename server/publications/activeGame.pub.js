//Dropped.
Meteor.publish('activePlays', function () {
    //    return BotConfig.find()
    return null
})



// Get Play => challeng.won.

Meteor.publish('getPlay', function (id) {

    var self = this;


    if (id && this.userId) {

        //return Plays.find(id,{limit : 1})
        var play = Plays.find(id, {
            limit: 1
        })

        return play


    } else {
        return null
    }

})



// Meteor Native
Meteor.publish('gameKick', function (id) {
    if (id) {

        var play = Plays.find({
            _id: id
        }, {
            fields: {
                kicked: 1,
                score: 1
            }
        }, {
            limit: 1
        }).observeChanges({
            added: function (id) {
                //console.log('added')
            },
            changed: function (id, fields) {
                console.log("Has Changed." + fields);
                console.log(fields)

            }
        });

        return this.ready();

    } else {
        return null
    }

})
//Polls.update({}, {$set : {answered : []}} , {multi:true})

Meteor.methods({

    pollAnswered: function (pollData) {
        console.log(pollData)

        // Update The poll data .

        Polls.update(pollData.surveyId, {
            $addToSet: {
                answered: pollData.usr
            }
        })


        // Update User Profile as answered surveys .


    },

    updateVote: function (options) {

        //console.log(options)

        var choice = options.choice;
        var pollId = options.surveyId;
        var pollUsr = options.usr;

        console.log(Polls.findOne(pollId))
        //console.log(pollId + choiceId )

        //        Polls.update(pollId, {
        //
        //            'choices.$.id': choice
        //        }, {
        //            $inc: {
        //                totalVotes: 1,
        //                'choices.$.votes': 1
        //            }
        //        }, {
        //            $addToSet: {
        //                answered: pollUsr
        //            }
        //        }, function (err) {
        //            if (err) {
        //                console.log(err)
        //            }
        //        });


        Polls.update({
            _id: pollId,
            'choices.id': choice
        }, {
            $inc: {
                totalVotes: 1,
                'choices.$.votes': 1
            }
        }, function (err) {
            if (err) {
                console.log(err)
            }
        })


        Polls.update(pollId, {

            $addToSet : {
                answered : options.usr

            }
        })


        Meteor.users.update(options.usr, {
            $addToSet: {
                'profile.polls': pollId
            }
        }, function (err) {
            if (err) {
                console.log('Poll + profile updated polls.methods' + err)
            }
        });
        
        
        PlayFunctions.liveChangeOut(options.usr, 1);


        console.log('Poll saved : polls.methods.js')



    }
})
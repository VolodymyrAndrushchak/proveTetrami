/*
    == Survey Controller 

*/

angular.module('randomino').controller('surveyCtrl', surveyCtrl);

function surveyCtrl($scope, $reactive, $state, $timeout) {

    $reactive(this).attach($scope);

    let subscriptionPlay = this.subscribe('PollOne', function () {
        return [Meteor.userId()]
    });


    this.autorun(() => {
        if (subscriptionPlay.ready()) {
            this.surveys = Polls.find({
                answered: {
                    $nin: [Meteor.userId()]
                }
            });
        }
    });



    $scope.helpers({
        surveys: () => {
            return Polls.find({
                answered: {
                    $nin: [Meteor.userId()]
                }
            })
        }
    });

    var dummyPoll = {

        choice: null,
        surveyId: null,
        usr: Meteor.userId(),
        type: 'ser'
    }


    var t = TempComb.insert(dummyPoll)

    $scope.change = function (item, survey) {
        var pollData = {

            choice: item.id,
            surveyId: survey,
            usr: Meteor.userId(),
            type: 'ser'

        }
        console.log(pollData)
        console.log(t)
        TempComb.update(t, {
            $set: {
                choice: pollData.choice,
                surveyId: pollData.surveyId
            }
        })


    };


    $scope.takeSurvey = function () {
        var pollResult = TempComb.findOne({
            type: 'ser'
        })
        Meteor.call('updateVote', pollResult, function (err, result) {
            if (!err) {
                console.log('updated')
                TempComb.remove({})

                $timeout(function () {
                    $state.go('app.feed');
                }, 200)

            }
        })
    }

}
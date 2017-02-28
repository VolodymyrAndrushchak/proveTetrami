/*

    Deprecated code.
    
    SyncdCron Control for The Bot.
    
    From the Front-end.

*/



Meteor.methods({
    botInit: function (options) {
        SyncedCron.add({
            name: options.jobId,
            schedule: function (parser) {
                return parser.text('every 1 min');
            },
            job: function () {
                console.log('*****Bot Started*****')

            }
        });

        SyncedCron.start()
    },
    botRemove: function (options) {
        SyncedCron.remove(options.jobId)
    }
})
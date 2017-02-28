/*


*/



Meteor.methods({
    botInit: function (options) {

        SyncedCron.add({
            name: options.jobId,
            schedule: function (parser) {
                // parser is a later.parse object
                return parser.text('every 1 min');
            },
            job: function () {

                //        Simulation.init()

                console.log('*****Bot Started*****')

            }
        });

        SyncedCron.start()
    },
    botRemove: function (options) {
        //SyncedCron.pause()
        console.log(options)
            //        SyncedCron.remove(options.jobId)
            //        SyncedCron.remove(jobName)
            //        var cons = console.log('ha')
            //        Simulation.init.apply(this , cons)

        SyncedCron.remove(options.jobId)
    }
})
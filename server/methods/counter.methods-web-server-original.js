//
//Plays.update({}, {$set : { statusActive: false}},{mutli:true}, function(err){
//    if(!err){
//        console.log('updated')
//    }
//})

//Plays.remove({})


var setCounter = function (play) {
    var play = Plays.findOne(play);

    // console.log(play)
    var product = Products.findOne(play.productId)


    // console.log(product)

    let survived = Plays.find({
        statusActive: true
    }).count();









    

    var newPrice = parseFloat(product.price) - (survived * parseFloat(product.discount));




    var winPrice = parseFloat(product.price) - parseFloat(newPrice)



    var results = {
        survived: survived,
        discount: product.discount,
        price: product.price,
        newPrice: newPrice,
        winPrice: winPrice,
        survRandom: survRandom
    }


    //console.log(results)

    Plays.update(play, {
        $set: {
            counter: results
        }
    }, function (err) {
        if (!err) {
            console.log('counter inserted')
        }
    });



}


Meteor.methods({
    counterStart: function (options) {

//        console.log(options)

        SyncedCron.add({
            name: options,
            schedule: function (parser) {
                // parser is a later.parse object
                return parser.text('every 3 secs');
            },
            job: function () {

                //        Simulation.init()

               
                    //setCounter(options)
                
                

                Bot.init() 
                console.log('*****Counter Started*****')

            }
        });


    },
    counterStop: function (options) {
        //SyncedCron.pause()
        console.log(options)
            //        SyncedCron.remove(options.jobId)
            //        SyncedCron.remove(jobName)
            //        var cons = console.log('ha')
            //        Simulation.init.apply(this , cons)

        SyncedCron.remove(options)
    }
})
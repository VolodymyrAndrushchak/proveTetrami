/*

    Stripe


    Loading Stripe private key 


*/



//import {Stripe} from 'meteor/mrgalaxy:stripe';

//Orders.remove({})



// When placing order get Product stock -1 




//var Stripe = StripeAPI(secret);









Meteor.methods({
    // Old exp.
    chargeCardx: function (stripeToken) {

        //OLD and Not needed ?
        //    var Stripe = StripeAPI('sk_test_0mXIknUHVHQIvqZmOkV3flxv');

        Stripe.charges.create({
            amount: 1,
            currency: 'usd',
            source: stripeToken
        }, function (err, charge) {
            console.log(err, charge);
        });

    },

    chargeCard: function (data) {


        console.log(data)




        var order = data.play



        order.playId = order._id

        delete order._id;

        order.orderedAt = new Date()
        order.createdAt = new Date()
        order.status = "waiting"

        check(data.stripeToken, String);
        //        var secret = Meteor.settings.private.stripe.testSecretKey;
        var Stripe = StripeAPI('sk_test_0mXIknUHVHQIvqZmOkV3flxv');

        Stripe.charges.create({
            source: data.stripeToken,
            amount: data.priceCheckout, // this is equivalent to $0.50
            currency: 'usd'
        }, Meteor.bindEnvironment(function (error, charge) {

            // Set Random Number Order
            order.stri = charge;


            appServer.setOrderNsert(order)
                // product -1 stock
            appServer.productOrdered(order.productId)

        }));
        //        




    },

    setNewOrder: function (play) {



        var order = play;
        order.playId = order._id

        delete order._id;

        order.orderedAt = new Date()
        order.createdAt = new Date()
        order.status = "waiting"




        //Update appServer.
        appServer.setOrderNsert(order)
            // product -1 stock
        appServer.productOrdered(order.productId)

//        console.log(order)

    }


});
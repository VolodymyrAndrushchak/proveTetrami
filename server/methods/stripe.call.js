Meteor.methods({
    'chargeCardX': function (stripeToken) {
        var Stripe = StripeAPI('sk_test_0mXIknUHVHQIvqZmOkV3flxv');

        Stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            source: stripeToken
        }, function (err, charge) {
            console.log(err, charge);
        });

        console.log('s')
    }
});
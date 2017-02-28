/*

    == checkout methods 
    
    == mirrored from web / server/methods/web/checkout.methods.js
*/

Meteor.methods({
    submitPaymentAddress: function (data) {
        
        

        Plays.update(data.play, {
            $set: {
                address: data
            }
        }, function (err) {
            if (err) {
                console.log('checkout.methods.js' + err);
            }
        });
        
        

    },
    
    
    // ADMIN Method

    setOrderStatus: function (order) {

        var set = {}
        
//        set[status] = true
        
        Orders.update(order.order, {
            $set: {
                status : order.status,
                shipmentCompany : order.shipmentCompany,
                trackingNumber : order.trackingNumber
            }
        }, function (err) {
            if (err) {
                console.log('Web/checkout.methods.js' + err);
            }
        });


    }
})
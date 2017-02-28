appServer = {

    productOrdered: function (product) {
        Products.update({
            _id: product
        }, {
            $inc: {
                stock: -1
            }
        })
    },
    setOrderNsert: function (order) {


        var orderId = this.randomInt(1000, 100000)

        //order._id = null ;

        delete order._id;

        var isExist = Orders.find({
            orderId: orderId
        }).count()


        //    console.log(order)



        if (isExist) {

            setOrderNsert(order)

        } else {


            order.orderId = orderId

            Orders.insert(order, function (err) {
                if (err) {
                    console.log(err)
                }
            })




        }



    },
    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


}
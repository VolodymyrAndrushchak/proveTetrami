appServer = {}


// Update The checkout Product Stock
appServer.productOrdered = function (product) {
    Products.update({
        _id: product
    }, {
        $inc: {
            stock: -1
        }
    })
}


// Setting a new Order with custom Order ID .
appServer.setOrderNsert = function (order) {
    var orderId = this.randomInt(1000, 100000)

    delete order._id;

    var isExist = Orders.find({
        orderId: orderId
    }).count()

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
}

// Get Random Int.
appServer.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Get Duration . 
// !!!Deprecated!!!
appServer.getDuration = function (createdAt, endAt) {
    var created = createdAt.getTime()
    var finished = endAt.getTime()
    var duration = finished - created
    function getDurationCount(millisec) {
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        //return minutes + ":" + seconds;
        return minutes;
    }
    return getDurationCount(duration)
}


appServer.randomComb = function () {
    var setComb = [this.randomInt(1, 5), this.randomInt(1, 5), this.randomInt(1, 5), this.randomInt(1, 5)];
    return setComb
}
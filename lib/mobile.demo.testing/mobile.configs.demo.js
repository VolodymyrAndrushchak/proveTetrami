Meteor.startup(function () {
    var feed = {

        "id": 1,
        "username": "kei_hinmin",
        "title": "iPhone 6 · 64GB · Silber  ",
        "won": "100,00",
        "currency": "eur",
        "avatar": "sampledata/images/avatar-1.jpg"

    }

    var product = {
        "id": 1,
        "image": "sampledata/products/1.jpg",
        "title": "LACOSTE Watch Red Black 2 MBS MD SD",
        "description": "An iconic <br/>watch family, the L.12.12 watch captures and transforms the essence of the polo shirt into a watch collection.<br/>Red Silicone Strap With Red Dial<br/>Buckle Closure<br/>Tr90 Composite Material & Red Silicone Case<br/>Quartz Movement<br/>2 Year Limited Warranty & 24-36 Months Approximate Battery Life",
        "price": "338,00",
        "discountrate": 0.25,
        "currency": "eur"
    }

    var faq = {
        name: 'Question 1',
        id: 1,
        items: [{
            subName: 'SubBubbles1',
            subId: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.'
            }]
    }

    Posts.insert(faq, function (err) {
        if (!err) {
            console.log('inserted');
        }
    })
    
    
    
    Feeds.insert(feed, function (err) {
        if (!err) {
            console.log('inserted');
        }
    })
    
    
    
    
    Cart.insert(product, function (err) {
        if (!err) {
            console.log('inserted');
        }
    });
    
    Products.insert(product, function (err) {
        if (!err) {
            console.log('inserted');
        }
    });
    
    
//    var Ord = Orders.find().fetch();
    
//    console.log(Ord)

    //    Products.remove({})
    
    var lives = {
        usr : 'o7cfMPKdHXL8HJ9vH' ,
        lives : 12
        
    }
    
    Lives.insert(lives , function(err){
        if(!err){
            console.log('live inserted')
        }
    });
});


Meteor.startup(function () {
    var feed = {

        "id": 1,
        "username": "kei_hinmin",
        "title": "iPhone 6 · 64GB · Silber  ",
        "won": "100,00",
        "currency": "eur",
        "avatar": "sampledata/images/avatar-1.jpg"

    }

    var Post = {

        "id": 1,
        "username": "kei_hinmin",
        "title": "iPhone 6 · 64GB · Silber  ",
        "content": "An iconic <br/>watch family, the L.12.12 watch captures and transforms the essence of the polo shirt into a watch collection.<br/>Red Silicone Strap With Red Dial<br/>Buckle Closure<br/>Tr90 Composite Material & Red Silicone Case<br/>Quartz Movement<br/>2 Year Limited Warranty & 24-36 Months Approximate Battery Life",
        "contentx": "100,00",
        "currency": "eur",
        "type": "faqs",
        "avatar": "sampledata/images/avatar-1.jpg"

    }

    var product = {
            "id": 1,
            "image": "sampledata/products/1.jpg",
            "name": "LACOSTE Watch Red Black 2 MBS MD SD",
            "desc": "An iconic <br/>watch family, the L.12.12 watch captures and transforms the essence of the polo shirt into a watch collection.<br/>Red Silicone Strap With Red Dial<br/>Buckle Closure<br/>Tr90 Composite Material & Red Silicone Case<br/>Quartz Movement<br/>2 Year Limited Warranty & 24-36 Months Approximate Battery Life",
            "price": 10,
            "discount": 1.25,
            "stock": 40,
            "currency": "eur",
            "published" : true
        }
        //
//                Products.insert(product, function (err) {
//                    if (!err) {
//                        console.log('inserted');
//                    }
//                })

    var faq = {
        name: 'Question 1',
        id: 1,
        items: [{
            subName: 'SubBubbles1',
            subId: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.'
            }]
    }

    //    Posts.insert(Post, function (err) {
    //        if (!err) {
    //            console.log('inserted');
    //        }
    //    })

    //    
    //    

    //    
    //    
    //    
    //    
    //    Cart.insert(product, function (err) {
    //        if (!err) {
    //            console.log('inserted');
    //        }
    //    });

    //    
    //
    ////    var Ord = Orders.find().fetch();
    //    
    ////    console.log(Ord)
    //
    //    //    Products.remove({})
    //    
    //    var lives = {
    //        usr : 'o7cfMPKdHXL8HJ9vH' ,
    //        lives : 12
    //        
    //    }
    //    
    //    Lives.insert(lives , function(err){
    //        if(!err){
    //            console.log('live inserted')
    //        }
    //    });
});


//var userF = Meteor.users.findOne("LYQ7brrkrW7uPLPRi");

//console.log(userF)



/*



*/


var choices = [
    {
        id: Random.id([5]),
        choice: 'yes i do',
        createdAt: new Date(),
        votes: 0,
        totalVotes: 0
        },
    {
        id: Random.id([5]),
        choice: 'no i do not',
        createdAt: new Date(),
        votes: 0,
        totalVotes: 0
        }

]


//

var survey = [
    {

        question: "Do you like Meteor ?",
        type: "client",
        choices: choices,
        createdAt: new Date(),
        usr: null

},
    {
        question: "Do you like Javascript ?",
        type: "client",
        choices: choices,
        createdAt: new Date(),
        usr: null
    },

    {
        question: "Do you like Nodejs ?",
        type: "client",
        choices: choices,
        createdAt: new Date(),
        usr: null
}
             ]


Meteor.startup(function () {

    //    _.each(survey , function(poll){
    //        Polls.insert(poll , function(err){
    //            if(!err){
    //                console.log('Polls Inserted Server.demo.test.js')
    //            }
    //        })
    //    });






    // Meteor.users.update({},{$set : {'profile.lives' : 40 , 'profile.lang' : 'en'}} , {multi: true});

    // earned lives demo setup 
    //Meteor.users.update({},{$set : {'profile.lives' : 61 , 'profile.livesEarned' : 11   ,  'profile.lang' : 'en'}} , {multi: true});
    //    
    //    Products.find({}).forEach(function(product){
    //        console.log(product)
    //        Products.update(product._id , {$set:{discount : product.discountrate}})
    //        console.log(product)
    //    })
    //Plays.update({},{$set:{statusActive : false}},{mutli:true})

    // Plays.remove({})

})
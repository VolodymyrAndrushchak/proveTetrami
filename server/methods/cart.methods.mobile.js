/*




    - In methods while adding a Play 
    
    
    - addCartItem 
    - Remove Cart Item 
    
    
    = check the users matching array in challange and kick the olders createdValue of them 
        - play Stop
        - Challenge updated with score .
        - Update Log 
        
        
        // 11 / May 
        Dropping This Cart . in favor of Win Challenge / Order 


*/




Meteor.methods({
    removeCartItem: function (id) {
        //console.log('Error')
        Cart.remove({
            _id: id
        }, function (err) {
            if (!err) {
                console.log('Item Removed')
            }
        })

    },
    addCartItem: function (cart) {

        // old name product => cartItem

        // Check if the same product exists before 


        // Deleted the old one replace it with the new one .


        // Get products prices {product} / discount price {play} / details in the Cart

        var ifItemExist = Cart.findOne({
            usr: cart.usr,
            productId: cart.product
        })
        
        
        var play = Plays.findOne(cart.playId);
        
        
       // console.log(play)
        
        cart.newPrice = play.discountPrice ;
        cart.checkoutReady = true ;
        cart.winPrice = play.winPrice ;


        if (ifItemExist) {

            Cart.remove(ifItemExist, function (err) {
                if (err) {
                    console.log('item removed by new item : cart.methods.mobile.js')
                }
            })



            var cartItemNew = Cart.insert(cart, function (err) {
                if (err) {
                    console.log('cart methods ' + err)
                }
            });



        } else {


            // add to cart 


            var cartItemNew = Cart.insert(cart, function (err) {
                if (!err) {
                    console.log('Added to cart')
                }
            });



           


        } //end else 


        
        Meteor.setTimeout(function(){
            
            //console.log('check')
            
            Cart.update(cartItemNew , {$set : {checkoutReady : false}}, function(err){
                if(!err){
                    console.log('Cart Item has been removed : timeoff = cart methods.mobile')
                }
            })
            
            
        },  10 * 60 * 1000)

        //return null;






    }


})
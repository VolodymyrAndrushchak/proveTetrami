/*

*/

// Dropped

Meteor.publish('cartItems' , function(){
    
    return Cart.find({usr : this.userId , checkoutReady : true})
});



Meteor.publish('cartProducts' , function(){
    var cartProducts = Cart.find({usr : this.userId }).fetch();
    var productsId = _.pluck(cartProducts , "product")
    var products = Products.find({_id :{ $in : productsId} });
    return products
})
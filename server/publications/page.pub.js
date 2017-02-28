//pages
Meteor.publish('posts', function () {
//    return Posts.find({published:true})
    return Posts.find()
})
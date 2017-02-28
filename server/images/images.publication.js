


Meteor.publish('productImages', function () {


    return Images.find()
//
//    return Images.find({
//        _id: {
//           
//            $in: uploadedImages
//        }
//    })

});




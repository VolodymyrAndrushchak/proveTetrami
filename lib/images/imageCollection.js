// Files , Images  , Avatars .


//Boxes = new Mongo.Collection("boxes")

//
var createThumb = function (fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    gm(readStream, fileObj.name()).resize('400', '500').stream().pipe(writeStream);
};

var createThumbStream = function (fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    gm(readStream, fileObj.name()).resize('845', '540').stream().pipe(writeStream);
};

//
//var imageStore = new FS.Store.FileSystem("imagesx", {
//  path: "~/app-files/images", //optional, default is "/cfs/files" path within app container
//  transformWrite: createThumb, //optional
//  transformRead: createThumb, //optional
//  maxTries: 1 //optional, default 5
//});
//

// LAST removed 28 June 

var imageStore = new FS.Store.GridFS("images", {
    // MONGO DB SERVER ...
    //mongoUrl: 'mongodb://46.101.111.164:27017/images', // optional, defaults to Meteor's local MongoDB
    //mongoOptions: {...},  // optional, see note below
    //transformWrite: myTransformWriteFunction, //optional
    //transformRead: myTransformReadFunction, //optional

    transformWrite: function (fileObj, readStream, writeStream) {
        // Transform the image into a 10x10px thumbnail
        gm(readStream, fileObj.name()).resize('500', '500').stream().pipe(writeStream);
    }

    //maxTries: 1, // optional, default 5
    //chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
    // Default: 2MB. Reasonable range: 512KB - 4MB
});
//


//var dropboxStore = new FS.Store.Dropbox("images", {
//  key: "5gk5dk4eo9ck2t3",
//  secret: "9qnjsuk4fsgm9tz",
//  token: "fnyy3ickJ8QAAAAAAAAO-1muHZDV2ph4K2Cpvs8kmTWQMx1S63EvZDaMtxuNJKTN", // Don’t share your access token with anyone.
//  folder: "randominoDemo" //optional, which folder (key prefix) to use 
//  // The rest are generic store options supported by all storage adapters
//  //transformWrite: myTransformWriteFunction, //optional
//  //transformRead: myTransformReadFunction, //optional
// // maxTries: 1 //optional, default 5
//});



// Removed Dropbox
Images = new FS.Collection("images", {
    //  stores: [dropboxStore]
    stores: [imageStore]
});

//
//Images = new FS.Collection("images", {
//    stores: [
//    new FS.Store.FileSystem("thumbs", {
//            transformWrite: createThumb ,
//            path: "~/images/thumbs"
//        }),
//    new FS.Store.FileSystem("stream", {
//            transformWrite: createThumbStream,
//            path: "~/images/stream"
//        }),
//    new FS.Store.FileSystem("images" , {
//            path: "~/images/full"
//    }),
//  ],
//    filter: {
//        allow: {
//            contentTypes: ['image/*'] //allow only images in this FS.Collection
//        }
//    }
//});
////
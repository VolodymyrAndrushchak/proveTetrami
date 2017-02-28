/*
    Setting Images Permissions 



*/

Images.allow({
    insert: function (userId, fileObj) {
        return true
    },
    update: function (userId, fileObj) {
        return true
    },
    download: function () {
        return true
    },
     // fetch: function() { return true },
    remove: function (userId, fileObj) {
        return true
    }
});


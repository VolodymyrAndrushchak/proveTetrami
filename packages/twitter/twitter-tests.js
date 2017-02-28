// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by twitter.js.
import { name as packageName } from "meteor/neox:twitter";

// Write your tests here!
// Here is an example.
Tinytest.add('twitter - example', function (test) {
  test.equal(packageName, "twitter");
});

// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by facebook2.js.
import { name as packageName } from "meteor/neox:facebook2";

// Write your tests here!
// Here is an example.
Tinytest.add('facebook2 - example', function (test) {
  test.equal(packageName, "facebook2");
});

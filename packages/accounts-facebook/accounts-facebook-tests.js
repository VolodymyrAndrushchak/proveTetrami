// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by accounts-facebook.js.
import { name as packageName } from "meteor/neox:accounts-facebook";

// Write your tests here!
// Here is an example.
Tinytest.add('accounts-facebook - example', function (test) {
  test.equal(packageName, "accounts-facebook");
});

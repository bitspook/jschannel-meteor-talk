var Fiber = require('fibers'),
    Future = require('fibers/future');

var getTwitterData = function() {
  var fut = new Future;
  setTimeout(function() {
    fut.return("Got Twitter Data");
  }, 1000);
  return fut.wait();
};

var getFacebookData = function() {
  var fut = new Future;
  setTimeout(function() {
    fut.return("Got Facebook Data");
  }, 500);
  return fut.wait();
};

Fiber(function() {
  console.log("Twitter operations before getting data.");
  console.log(getTwitterData());
  console.log("Twitter operations after getting data.");
}).run();

Fiber(function() {
  console.log("Facebook operations before getting data.");
  console.log(getFacebookData());
  console.log("Facebook operations after getting data.");
}).run();

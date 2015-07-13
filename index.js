'use strict';

var request = require('superagent');

// patch superagent to attach CSRF-token to all requests
try {
  var csrf = document.cookie.match(/csrftoken=(.*?)(?:$|;)/)[1];
}
catch (err) {
  return;
}
var end = request.Request.prototype.end;
request.Request.prototype.end = function(fn) {
  this.set('X-CSRFToken', csrf);
  return end.call(this, fn);
};

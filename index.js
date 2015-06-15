'use strict';

require('superagent');

// patch superagent to attach CSRF-token to all requests
var csrf = document.cookie.match(/csrftoken=(.*?)(?:$|;)/)[1];
var end = request.Request.prototype.end;
request.Request.prototype.end = function(fn) {
  this.set('X-CSRFToken', csrf);
  return end.call(this, fn);
};

'use strict';

var request = require('superagent');

// patch superagent to attach CSRF-token to all requests
try {
  var end = request.Request.prototype.end;
  request.Request.prototype.end = function(fn) {
    var csrf = document.cookie.match(/csrftoken=(.*?)(?:$|;)/)[1];
    this.set('X-CSRFToken', csrf);
    return end.call(this, fn);
  };
}
catch (err) {
  
}


'use strict';

var request = require('superagent');

// patch superagent to attach CSRF-token to all requests
try {
  var csrf = document.cookie.match(/csrftoken=(.*?)(?:$|;)/)[1];
  var end = request.Request.prototype.end;
  request.Request.prototype.disableDjangoCsrf = function() {
    this._djangoCsrf = false;
    return this;
  };
  request.Request.prototype.end = function(fn) {
    if (this._djangoCsrf !== false){
      this.set('X-CSRFToken', csrf);
    }
    return end.call(this, fn);
  };
}
catch (err) {
  
}


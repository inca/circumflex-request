"use strict";

var _ = require('underscore')
  , express = require('express')
  , RequestExt = require('./request-ext')
  , Multipart = require('./multipart')
  , BodyParser = require('body-parser');

module.exports = exports = function() {

  _.extend(express.request, RequestExt);

  return function(req, res, next) {
    var multipart = Multipart();
    var urlencoded = BodyParser.urlencoded({ extended: false });
    var json = BodyParser.json();
    multipart(req, res, function() {
      urlencoded(req, res, function() {
        json(req, res, next);
      });
    });
  };

};

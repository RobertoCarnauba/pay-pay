var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
const { check } = require('express-validator');

module.exports = function(){
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(check());

  consign()
   .include('controllers')
   .then('persistencia')
   .into(app);

  return app;
}

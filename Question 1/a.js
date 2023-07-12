//Develop a HTTP microservice to display all trains in next 25 hours with their seat availability with their arriving
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./bin/router');
var app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var db = require('./bin/db');
db.initMysql(function (result) {
    if(result.ok){
        console.log("init data successful!");
    }
});

app.use('/office', router);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

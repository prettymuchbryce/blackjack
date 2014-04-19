var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());

app.use(function(err, req, res, next) {
  res.send(400, 'Bad Request');
});

var Router = require('./router.js');
Router.init(app);

app.listen(3000);
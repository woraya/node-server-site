var express = require('express');
var mongojs = require('mongojs');
var multer = require('multer');
var router = require('./app/routes');
var expressLayouts = require('express-ejs-layouts');
var nodeNasa = require("node-nasa");
// var urlToImage = require('url-to-image');
var requestify = require('requestify');


var app = express();
var port = 3000;

// take care of post variables in the route
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var upload = multer();

//mongodb://<dbuser>:<dbpassword>@ds113650.mlab.com:13650/netmedia
var db = mongojs("username:password@ds113650.mlab.com:13650/netmedia", ["posts"]);

app.use(urlencodedParser);

// route my app
app.use(router);

// use ejs & express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// use static files (css, imgs)
app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('Server listening on port: ' + port);
});
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');


var apiRoutes = require('./routing/apiRoutes.js');
var htmlRoutes = require('./routing/htmlRoutes.js');

var PORT = 3000;

var app = express();
app.use(apiRoutes);
app.use(htmlRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());











app.listen(PORT, function() {
	console.log("Friend Finder App listening on PORT " + PORT);
});
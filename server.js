var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');


var apiRoutes = require('./routing/apiRoutes.js');
var htmlRoutes = require('./routing/htmlRoutes.js');

var PORT = process.env.PORT || 3000;

var app = express();
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function() {
	console.log("Friend Finder App listening on PORT " + PORT);
});
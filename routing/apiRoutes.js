var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/api/friends', function(req, res){
	fs.readFile('./data/friends.js', 'utf8', function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).json(err);
		}
		res.json(JSON.parse(data));
	});
});

router.post('/api/friends', jsonParser, function(req, res){
	//stuff to add a friend
	let friends = [];
	console.log(req.body);

	fs.readFile('./data/friends.js', 'utf8', function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).json(err);
		}
		friends = JSON.parse(data);
		friends.push(req.body);
		fs.appendFile('./data/friends.js', JSON.stringify(friends), 'utf8', (err) => {
			if (err) {
				console.log(err);
				res.status(500).json(err);
			}
			res.status(201).json(JSON.stringify(req.body));

			//the response should contain the newly added person's best match
		});
	});
});

module.exports = router;
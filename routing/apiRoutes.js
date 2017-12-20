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
		if (data.length < 1) {
			data = JSON.stringify({});
		}
		res.json(JSON.parse(data));
	});
});

router.post('/api/friends', jsonParser, function(req, res){
	//stuff to add a friend
	let friends = [];
	// console.log(req.body);
	let friend = JSON.parse(JSON.stringify(req.body));

	fs.readFile('./data/friends.js', 'utf8', function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).json(err);
		}
		if (data.length < 1) {
			data = JSON.stringify([]);
		}
		friends = JSON.parse(data);
		let match = findFriend(friend, friends);
		friends.push(friend);
		// console.log(friends);
		fs.writeFile('./data/friends.js', JSON.stringify(friends), 'utf8', (err) => {
			if (err) {
				console.log(err);
				res.status(500).json(err);
			}
			res.status(201).json(match);

			//the response should contain the newly added person's best match
		});
	});
});

function findFriend(person, peopleArr) {
	let bestMatch;
	let bestDiff = null;
	for (let i = 0; i < peopleArr.length; i++) {
		let diff = 0;
		for (let j = 0; j < peopleArr[i].answers.length; j++) {
			diff += Math.abs(person.answers[j] - peopleArr[i].answers[j]);
		}
		if (diff < bestDiff || bestDiff == null) {
			bestMatch = peopleArr[i];
			bestDiff = diff;
		}
	}
	console.log(bestMatch);
	return bestMatch;
}

module.exports = router;
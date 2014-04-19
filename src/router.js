var Game = require('./game.js');
var GameManager = require('./game-manager.js');

/**
* Router interfaces with requests. 
* Router takes user input, manipulates Game objects based on that input, and responds to the user.
**/
var Router = function() {
	this.init = function(app) {
		app.get('/new', function(req, res) {
			var game = GameManager.createGame();
			var state = game.getPublicState();
			res.send(state, 200);

			if (state.isGameOver) {
				GameManager.removeGame(game);
			}
		});

		app.post('/hit', function(req, res) {
			if (req.body.id === undefined || typeof req.body.id !== 'string') {
				res.send(400, 'No game by id ' + req.body.id);
				return;
			}

			var game = GameManager.getGameById(req.body.id);

			if (game === undefined) {
				res.send(400, 'No game by id ' + req.body.id);
				return;
			}

			game.hit();
			var state = game.getPublicState();
			res.send(state, 200);

			if (state.isGameOver) {
				GameManager.removeGame(game);
			}
		});

		app.post('/stand', function(req, res) {
			if (req.body.id === undefined || typeof req.body.id !== 'string') {
				res.send(400, 'You must specify a game id.');
				return;
			}

			var game = GameManager.getGameById(req.body.id);

			if (game === undefined) {
				res.send(400, 'No game by id ' + req.body.id);
				return;
			}

			game.stand();
			var state = game.getPublicState();
			res.send(state, 200);

			if (state.isGameOver) {
				GameManager.removeGame(game);
			}
		});
	}
};

module.exports = new Router();
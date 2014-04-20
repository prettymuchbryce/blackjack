var _ = require('underscore');
var Game = require('./game.js');
var Hashids = require('hashids');
var moment = require('moment');
var hashids = new Hashids('Some Salt Here');
var ONE_HOUR = 60 * 1000 * 60;

/**
* GameManager manages all the games. It stores each game by id.
* It is responsible for creating, keeping track of, and storing new games in application memory.
**/
var GameManager = function() {
	var that = this;
	var games = {};
	var gameCounter = 0;

	/**
	* Creates a new game, and returns it.
	*
	* @return {Object} A new game object.
	**/
	this.createGame = function() {
		var game = new Game(getGameId());
		game.init();
		games[game.getId()] = game;
		return game;
	};

	/**
	* Removes a completed game
	**/
	this.removeGame = function(game) {
		delete games[game.getId()];
	};

	/**
	* Returns a game by id
	*
	* @param {String} id A valid game id.
	* @return {Object} A game object.
	**/
	this.getGameById = function(id) {
		return games[id];
	};

	/**
	* Returns a unique game id.
	* 
	* @return {String} A valid game id.
	**/
	var getGameId = function() {
		gameCounter++;
		return hashids.encrypt(gameCounter);
	};

	/**
	* Game timer. Deletes games which have been inactive for over an hour.
	**/
	var gameTimer = function() {
		var now = new Date();
		_.each(games, function(game) {
			if (moment(now).diff(game.getCreatedAt()) > ONE_HOUR) {
				that.removeGame(game);
			}
		});
	};

	setInterval(gameTimer, ONE_HOUR);
};

module.exports = new GameManager();

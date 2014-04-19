var Game = require('./game.js');
var Hashids = require("hashids");
var hashids = new Hashids("Some Salt Here");

/**
* GameManager manages all the games. It stores each game by id.
* It is responsible for creating and storing new games in application memory.
**/
var GameManager = function() {
	var games = {};
	var gameCounter = 0;

	/**
	* Creates a new game
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
	}
};

module.exports = new GameManager();

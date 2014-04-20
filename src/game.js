var _ = require('underscore');
var Utils = require('./utils.js');
var Deck = require('./deck.js');

/**
* Main class for storing and manipulating gamestate.
**/
var Game = function(gameId) {
	var id = gameId;
	var deck = new Deck();
	var dealerCards = [];
	var publicState = {};
	var createdAt = undefined;

	/**
	* Initialize the game.
	**/
	this.init = function() {
		createdAt = new Date();
		publicState = {};
		publicState.id = id;
		publicState.isGameOver = false;
		publicState.outcome = undefined;
		publicState.reason = undefined;
		publicState.player = { numCards: 0, faceUpCards: [] };
		publicState.dealer = { numCards: 0, faceUpCards: [] };
		dealerCards = [];

		deck.init();
		deck.shuffle();
		deal();
	};

	/**
	* Deal the initial cards to the players. 
	* Also checks if the dealer has 21.
	**/
	var deal = function() {
		//Deal one card face up to the player
		publicState.player.faceUpCards.push(deck.getNextCard());
		publicState.player.numCards++;

		//Deal one card face down to the dealer
		dealerCards.push(deck.getNextCard()); //Dealer card is not visible by the player
		publicState.dealer.numCards++;

		//Deal one card face up to the player
		publicState.player.faceUpCards.push(deck.getNextCard());
		publicState.player.numCards++;

		//Deal one card face up to the dealer
		var card = deck.getNextCard();
		dealerCards.push(card);
		publicState.dealer.faceUpCards.push(card);
		publicState.dealer.numCards++;

		//Check for dealer blackjack
		if (Utils.getHandValue(dealerCards) === 21) {

			//If player also has 21 it is a push
			if (Utils.getHandValue(publicState.player.faceUpCards) === 21) {
				endGame('push');			
			} else {
				endGame('lose', 'score');			
			}
		}
	};

	/**
	* Indicate that the player wishes to stand.
	**/
	this.stand = function() {
		if (publicState.isGameOver) {
			return;
		}

		//Dealer plays until the value of his cards are >= 17
		while (Utils.getHandValue(dealerCards) < 17) {
			var card = deck.getNextCard();
			publicState.dealer.faceUpCards.push(card);
			dealerCards.push(card);
			publicState.dealer.numCards++;
		}

		if (Utils.getHandValue(dealerCards) > 21) {
			//Dealer busted
			endGame('win', 'bust');			
		} else if (Utils.getHandValue(dealerCards) === Utils.getHandValue(publicState.player.faceUpCards)) {
			//Dealer tied player
			endGame('push');			
		} else if (Utils.getHandValue(dealerCards) > Utils.getHandValue(publicState.player.faceUpCards)) {
			//Dealer beat player		
			endGame('lose', 'score');					
		} else {
			//Player beat dealer
			endGame('win', 'score');						
		}
	};

	/**
	* Ends the game
	*
	* @param {String} outcome The outcome of the game.
	* @param {String} reason The reason for the outcome.
	**/
	var endGame = function(outcome, reason) {
		publicState.isGameOver = true;
		publicState.outcome = { value: outcome, reason: reason };
		publicState.dealer.faceUpCards = dealerCards; //reveal dealers cards
	};

	/**
	* Returns the game id.
	*
	* @return {Number} The game id
	**/
	this.getId = function() {
		return id;
	};


	/**
	* Returns when the game was created.
	*
	* @return {Object} A date object.
	**/
	this.getCreatedAt = function() {
		return createdAt;
	}

	/**
	* Indicate that the player wishes to hit.
	**/
	this.hit = function() {
		if (publicState.isGameOver) {
			return;
		}

		publicState.player.faceUpCards.push(deck.getNextCard());
		publicState.player.numCards++;

		if (Utils.getHandValue(publicState.player.faceUpCards) > 21) {
			endGame('lose', 'bust');			
		}
	};

	/**
	* Gets the current player-known state of the game.
	*
	* @return {Object} The current player-known state of the game.
	**/
	this.getPublicState = function() {
		return publicState;
	};

};

module.exports = Game;
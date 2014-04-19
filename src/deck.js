var _ = require('underscore');

/**
* Class which represents a deck of cards.
**/
var Deck = function() {
	var cards = [];

	/**
	*	Initialize the deck.
	**/
	this.init = function() {
		cards = [];
		_.each(Deck.SUITES, function(suit) {
			_.each(Deck.RANKS, function(rank) {
				var card = { name : rank.name, value: rank.value, suit: suit };
				cards.push(card);
			});
		});
	};

	/**
	*	Shuffles the deck
	**/
	this.shuffle = function() {
		cards = _.shuffle(cards);
	};

	/**
	*	Return the card at the top of the deck.
	*	@return {Object} A card object.
	**/
	this.getNextCard = function() {
		if (cards.length === 0) {
			return null;
		}
		
		return cards.shift();
	};
};

Deck.SUITES = ["Spades", "Hearts", "Clubs", "Diamonds"];
Deck.RANKS = [
	{ 'name': 'Ace', 'value': 11 },
	{ 'name': 'Two', 'value': 2 },
	{ 'name': 'Three', 'value': 3 },
	{ 'name': 'Four', 'value': 4 },
	{ 'name': 'Five', 'value': 5 },
	{ 'name': 'Six', 'value': 6 },
	{ 'name': 'Seven', 'value': 7 },
	{ 'name': 'Eight', 'value': 8 },
	{ 'name': 'Nine', 'value': 9 },
	{ 'name': 'Ten', 'value': 10 },
	{ 'name': 'Jack', 'value': 10 },
	{ 'name': 'Queen', 'value': 10 },
	{ 'name': 'King', 'value': 10 }
];

module.exports = Deck;
var assert = require('chai').assert;
var Deck = require('../src/deck.js');

describe('Deck', function() {
    var deck = new Deck();
    beforeEach(function(done){
        deck.init();
        done();
    });

	describe('#init()', function() {
        it('Deck should contain 52 cards', function() {
    		var card = deck.getNextCard();
        	deck.init();

        	for (var i = 0; i < 52; i++) {
        		var card = deck.getNextCard();
        	}

        	assert.isNull(deck.getNextCard());

        });
    });

    describe('#shuffle()', function() {
        it('It should shuffle the cards.', function() {
    		var card = deck.getNextCard();
    		assert.equal(card.value, 11);
    		assert.equal(card.name,'Ace');
        	
        	deck.init();

        	var currentOrder = [];
        	for (var i = 0; i < 52; i++) {
        		var card = deck.getNextCard();
        		currentOrder.push(card);
        	}

        	deck.init();
        	deck.shuffle();
        	deck.shuffle();
        	deck.shuffle();

        	var cardsEqual = 0;
        	for (i = 0; i < 52; i++) {
        		var card = deck.getNextCard();
        		if (currentOrder[i].value === card.value &&
        			currentOrder[i].name === card.name &&
        			currentOrder[i].suit === card.suit) {
        			cardsEqual++;
        		}
        	}

        	assert.notEqual(cardsEqual, 52);

        });
    });
});
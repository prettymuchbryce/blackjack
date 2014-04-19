var assert = require('chai').assert;
var Game = require('../src/game.js');
var _ = require('underscore');

describe('Game', function() {
    var game;
    beforeEach(function(done){
        game = new Game();
        done();
    });

	describe('#init()', function() {
        it('Should initialize the game', function() {
            game.init();
            var state = game.getPublicState();
            assert.equal(state.player.numCards, 2);
            assert.equal(state.dealer.numCards, 2);
        });
    });

    describe('#hit()', function() {
        it('Player should be able to hit until bust', function() {
            game.init();
            var state = game.getPublicState();

            //Make sure dealer didn't win right off the bat
            while (state.isGameOver) {
                game.init();
                state = game.getPublicState();
            }

            while (!state.isGameOver) {
                game.hit();
                state = game.getPublicState();
            }

            assert.isTrue(state.isGameOver);
            assert.equal(state.outcome.value, 'lose');
            var total = 0;
            _.each(state.player.faceUpCards, function(card) {
                total += card.value;
            });
            assert.operator(total, '>', 21);

        });
    });

    describe('#stand()', function() {
        it('Player should be able to stand', function() {
            game.init();
            var state = game.getPublicState();

            //Make sure dealer didn't win right off the bat
            while (state.isGameOver) {
                game.init();
                state = game.getPublicState();
            }

            game.stand();

            assert.equal(state.player.faceUpCards.length, 2);
            assert.equal(state.player.numCards, 2);

            assert.equal(state.dealer.numCards, state.dealer.faceUpCards.length);
            assert.isTrue(state.isGameOver, true);
        });
    });
});
var assert = require('chai').assert;
var Utils = require('../src/utils.js');

describe('Utils', function() {
	describe('#getHandValue()', function() {
        it('It should get the value of the hand', function() {
    		var hand = [];
            hand.push({ value: 11 });
            hand.push({ value: 11 });
            assert.equal(Utils.getHandValue(hand), 12);
            hand.push({ value: 9 });
            assert.equal(Utils.getHandValue(hand), 21);
            hand.push({ value: 9 });
            assert.equal(Utils.getHandValue(hand), 20);
        });
    });
});
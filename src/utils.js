var _ = require('underscore');

var Utils = function() {
	/**
	* Gets the value of the hand, swapping ace values with 1 until a bust, or a hand under 21 is found.
	* Potentially mutates the value of aces in the 'cards' input list.
	*
	* @param {Array} cards The list of cards to get the total value of.
	* @return {Number} The total value of the cards given in the cards input.
	**/
	this.getHandValue = function(cards) {
		var valueList = _.map(cards, function(card) { return card.value });
		var total = _.reduce(valueList, function(memo, num) { return memo + num });

		while (_.contains(valueList, 11) && total > 21) {
			for (var i = 0; i < cards.length; i++) {
				if (cards[i].value === 11) {
					cards[i].value = 1;
					break;
				}
			}

			valueList = _.map(cards, function(card) { return card.value });
			total = _.reduce(valueList, function(memo, num) { return memo + num });
		}

		return total;
	};
};

module.exports = new Utils();
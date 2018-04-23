"use strict";

var SingleEntryActivity = require('./singleentryactivity.js');

class FourVoteActivity extends SingleEntryActivity {

	// groups by input content and accumulates counter, as well as total
	getAggregatedInput() {
		var result = {
			total: 0,
			content: {}
		};
		var validEntries =  this.getValidInputPerUser();
		var c = '';
		for (var user_id in validEntries) {
			c = validEntries[user_id];
			if (result.content[c] == null)
				result.content[c] = 0;

			result.content[c]++;
			result.total++;
		}
		return result;
	}
}



module.exports = FourVoteActivity;
"use strict";

var InputEntry = require('./inputentry.js');
var BaseActivity = require('./baseactivity.js');

// ABSTRACT! Does not implement getAggregated()
class SingleEntryActivity extends BaseActivity {

	// Returns only last entry per user_id as flat array
	getValidInputPerUser() {
		var result = {};
		this.inputData.forEach(e => {
			result[e.user_id] = e.content;
		});
		return result;
	}

}

module.exports = SingleEntryActivity;
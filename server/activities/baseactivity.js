"use strict";

var InputEntry = require('./inputentry.js');

// ABSTRACT! Does not implement getAggregated()
class BaseActivity {

	constructor() {
		this.clientModel = 'NULL';
		this.inputData = [];	// flat InputEntry[]
	};

	addInput(user_id, data) {
		var newEntry = new InputEntry(user_id, data.content);
		this.inputData.push(newEntry);
		return newEntry.toJSON();	// return new entry
	};

	// Get all stored input as a flat array of {userId,content} objects
	getRawInput() {
		return this.inputData.map(function(e) {
			return {
				user_id: e.user_id,
				content: e.content
			}
		});
	};

	// Groups all entries by user_id as a flat array sorted oldest-newest
	getValidInputPerUser() {
		var result = {};
		this.inputData.forEach(e => {
			// Create user_id index if it doesn't exist yet
			if (result[e.user_id] == null)
				result[e.user_id] = [];

			result[e.user_id].push(e.content);
		});

		return result;
	};

}

module.exports = BaseActivity;
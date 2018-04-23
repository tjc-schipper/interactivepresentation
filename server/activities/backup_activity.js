Activity.prototype.clientModel = "";
Activity.prototype.data = {};

function Activity() {
	console.log("Created default activity");
}


// data = {content: 123}
Activity.prototype.addInput = function(user_id, data) {
	// overwrite mode!
	this.data[user_id] = new InputEntry(user_id, data.content);
}

Activity.prototype.getAllInput = function() {
	var result = { num: 0, entries: []};
	for (var user_id in this.data) {
		result.entries.push({
			user_id: user_id, 
			content: this.data[user_id]
		});
	}
	return result;
}

Activity.prototype.getInputByUser = function(user_id) {
	var result = { num: 0, input: []};
	for (var item in this.data) {
		if (this.data[item].user_id == user_id) {
			result.num++;
			result.input.push(this.data[item]);
		}
	}
	return result;
}

Activity.prototype.getAggregatedInput = function() {
	var result = { num: 0, input: []};
	return this.data.reduce(function(acc, entry) {
		
		// Create object in result.content array if doesn't exist
		if (acc.content[entry.content] == null) {
			acc.content[entry.content] = {
				content: entry.content,
				count: 0,
				users: []
			};
		}

		// Add data to result.content array
		acc.content[entry.content].count++;
		acc.content[entry.content].users.push(entry.user_id);

		// Increment total count
		acc.num++;	
	}, result);
}


Activity.prototype.getClientModel = function() {
	return this.clientModel;
}
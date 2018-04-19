Activity.prototype.clientModel = "";
Activity.prototype.data = [];

//TODO: Inherit from this!

function Activity() {
}


// data = {value: 123}
Activity.prototype.addInput(user_id, data) {
	this.data[user_id] = new DataEntry(user_id, data.value);
}

Activity.prototype.getInputByUser(user_id) {
	const found = this.data[user_id];
	return (found != null) ? found.value : null;
}

Activity.prototype.getAggregatedInput() {
	var result = { num: 0, values: []};
	return this.data.reduce(function(acc, entry) {
		
		// Create object in result.values array if doesn't exist
		if (result.values[entry.value] == null) {
			result.values[entry.value] = {
				value: entry.value,
				count: 0,
				users: []
			};
		}

		// Add data to result.values array
		result.values[entry.value].count++;
		result.values[entry.value].users.push(entry.user_id);

		// Increment total count
		result.num++;	
	}, result);
}


// Container class for activity data
function DataEntry(user_id, value) {
	this.value = value;
	this.user_id = user_id;
}
module.exports = Activity;
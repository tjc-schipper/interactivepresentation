Activity.prototype.clientModel = "";
Activity.prototype.data = [];

//TODO: Inherit from this!

function Activity() {
}


// data = {content: 123}
Activity.prototype.addInput = function(user_id, data) {
	this.data[user_id] = new InputEntry(user_id, data.content);
}

Activity.prototype.getAllInput = function() {
	return this.data.map(function(el) {
		return el.content;
	});
}

Activity.prototype.getInputByUser = function(user_id) {
	const found = this.data[user_id];
	return (found != null) ? found.content : null;
}

Activity.prototype.getAggregatedInput = function() {
	var result = { num: 0, content: []};
	return this.data.reduce(function(acc, entry) {
		
		// Create object in result.content array if doesn't exist
		if (result.content[entry.content] == null) {
			result.content[entry.content] = {
				content: entry.content,
				count: 0,
				users: []
			};
		}

		// Add data to result.content array
		result.content[entry.content].count++;
		result.content[entry.content].users.push(entry.user_id);

		// Increment total count
		result.num++;	
	}, result);
}


// Container class for activity input
function InputEntry(user_id, content) {
	this.content = content;
	this.user_id = user_id;
}
module.exports = Activity;
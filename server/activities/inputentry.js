function InputEntry(user_id, content) {
	this.user_id = user_id;
	this.content = content;

}
// Unsure if this is necessary...
InputEntry.prototype.toJSON = function() {
		return {user_id: this.user_id, content: this.content};

}

module.exports = InputEntry;
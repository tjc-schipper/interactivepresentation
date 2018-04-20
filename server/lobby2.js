//TODO: Create Activity classes!

const ACTIVITIES = [
// WaitScreen,
// SimpleVotes,
// WaitScreen,
// WordCloud,
// WaitScreen,
// TugOfWar,
// EndScreen
];

Lobby.prototype.users = require('./users.js').userList;	// reference to central users list for all lobbies
Lobby.prototype.code;
Lobby.prototype.timeCreated;
Lobby.prototype.user_ids = [];

Lobby.prototype.activity;
Lobby.prototype.activityIdx;

function Lobby(lobby_code) {
	this.code = lobby_code;
	this.timeCreate = new Date().getTime() / 1000;
	this.activityIdx = 0;
}

Lobby.prototype.addUser = function(user_id) {
	this.user_ids.push(user_id);
	console.log('LOG: User ' + user_id + ' added to lobby ' + this.code);
}

Lobby.prototype.removeUser = function(user_id) {
	var i = 0;
	// iterate until i points to index of user_id
	for (i; i < this.user_ids.length; i++) {
		if (this.user_ids[i] === user_id)
			break;
	}
	// remove the user_id from the list
	this.user_ids.splice(i, 1);
	console.log('LOG: User ' + user_id + ' removed from lobby ' + this.code);
}

Lobby.prototype.hasUser = function(user_id) {
	return this.user_ids.includes(user_id);
}

Lobby.prototype.userCount = function() {
	return this.user_ids.length;
}

// This sends a message to all users connected to this lobby
Lobby.prototype.emitToAll = function(endpoint, data) {
	for (var i = 0; i < this.user_ids.length; i++) {
		var uid = this.user_ids[i];
		this.users[uid].emit(endpoint, data);
	}
}

Lobby.prototype.getEmittableUserList = function() {
	var userList = [];
	for (var i = 0; i < this.user_ids.length; i++) {
		var uid = this.user_ids[i];
		userList.push({
			face: '',
			id: uid,
			username: this.users[uid].username,
			x: 0,	//?
			y: 0,	//?
			a: 0	//?
		});
	}
	return userList;
}

// data = {value: 123}
Lobby.prototype.receiveInput = function(user_id, data) {
	if (this.activity == null)
		return;

	this.activity.addInput(user_id, data);
}

Lobby.prototype.close = function() {
	this.emitToAll('disconnect', {
		lobbyCode: this.code,
		reason: 'Lobby closed!'
	});
}

module.exports = Lobby;
var Lobby = require('./lobby2.js');

var LobbyManager = module.exports = {
	MAX_USERS_PER_LOBBY: 2,
	lobbies: {},

	addUserToLobby: function(user_id, lobby_code) {
		this.lobbies[lobby_code].addUser(user_id);
		return true;
	},

	removeUserFromLobby: function(user_id, lobby_code) {
		this.lobbies[lobby_code].removeUser(user_id);
	},

	createLobby: function(lobby_code) {
		var lobby = new Lobby(lobby_code);
		this.lobbies[lobby_code] = lobby;
		return lobby;
	},

	closeLobby: function(lobby_code) {
		var lobby = this.lobbies[lobby_code];
		if (lobby != null) {
			lobby.close();
			delete this.lobbies[lobby_code];
		}
	},

	advanceLobbyActivity: function(lobby_code) {
		var lobby = this.lobbies[lobby_code];
		if (lobby != null)
			lobby.nextActivity();
	},

	getLobbyForUser: function(user_id) {
		var lobby;
		for (var i = 0; i < this.lobbies.length; i++) {
			if (this.lobbies[i].hasUser(user_id)) {
				lobby = this.lobbies[i];
				break;
			}
		}
		return lobby;
	}


}
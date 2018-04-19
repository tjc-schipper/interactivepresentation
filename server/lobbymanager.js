var Lobby = require('./lobby2.js');

var LobbyManager = module.exports = {
	MAX_USERS_PER_LOBBY: 2,
	lobbies: {},

	addUserToLobby: function(user_id, lobby_code) {
		const lobby = this.lobbies[lobby_code];
		if (lobby != null) {
			if (!lobby.hasUser(user_id)) {
				lobby.addUser(user_id);
				return true;
			}
			else
				return false;
		}
		else
			return false;
	},

	removeUserFromLobby: function(user_id) {
		var userLobby = this.getLobbyForUser(user_id);
		if (userLobby != null) {
			userLobby.removeUser(user_id);
		}
	},

	createLobby: function(lobby_code) {
		if (this.lobbies[lobby_code] != null) {
			console.log('WARNING: Code already in use');
			return;
		}

		var lobby = new Lobby(lobby_code);
		this.lobbies[lobby_code] = lobby;
		console.log('LOG: Created lobby: ' + lobby_code);
		return lobby;
	},

	closeLobby: function(lobby_code) {
		var lobby = this.lobbies[lobby_code];
		if (lobby != null) {
			lobby.close();
			delete this.lobbies[lobby_code];
			console.log('LOG: Closed lobby: ' + lobby_code);
		}
		else
			console.log('WARNING: Cannot close lobby ' + lobby_code + ', does not exist');
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
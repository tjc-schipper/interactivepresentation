"use strict";

var Lobby = require('./lobby2.js');
var users = require('./users.js').userList;

class LobbyManager {
	
	constructor() {
		this.lobbies = {};
	}

	addUserToLobby (user_id, lobby_code) {
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
	};

	removeUserFromLobby(user_id) {
		var lobby = this.getLobby(users[user_id].lobbyCode);
		if (lobby != null) {
			lobby.removeUser(user_id);
		}
	};

	createLobby(lobby_code) {
		if (this.lobbies[lobby_code] != null) {
			console.log('WARNING: Code already in use');
			return;
		}

		var lobby = new Lobby(lobby_code);
		this.lobbies[lobby_code] = lobby;
		console.log('LOG: Created lobby: ' + lobby_code);
		return lobby;
	};

	getLobby(lobby_code) {
		return this.lobbies[lobby_code];
	};

	closeLobby(lobby_code) {
		var lobby = this.lobbies[lobby_code];
		if (lobby != null) {
			lobby.close();
			delete this.lobbies[lobby_code];
			console.log('LOG: Closed lobby: ' + lobby_code);
		}
		else
			console.log('WARNING: Cannot close lobby ' + lobby_code + ', does not exist');
	};

	advanceLobbyActivity(lobby_code) {
		var lobby = this.lobbies[lobby_code];
		if (lobby != null)
			lobby.nextActivity();
	};

	getLobbyForUser(user_id) {
		var lobby;
		for (var i = 0; i < this.lobbies.length; i++) {
			if (this.lobbies[i].hasUser(user_id)) {
				lobby = this.lobbies[i];
				break;
			}
		}
		return lobby;
	};
}

module.exports = LobbyManager;
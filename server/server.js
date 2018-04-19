#!/bin/env node
var express = require('express');
var http = require('http').Server();
var io = require('socket.io')(http);
var users = require('./users.js').userList;	// central user list for all lobbies!
var lobbyManager = require('./lobbymanager.js');

io.on('connection', function(user) {
	
	users[user.id] = user;
	console.log('User connected with id: ' + user.id);

	// data = {lobbyCode: 'abcd'}
	user.on('lobby-join', function(data) {
		if (!lobbyManager.addUserToLobby(user.id, data.lobbyCode)) {
			// notify user if not successful!
			user.emit('lobby-join-failed', {
				reason: 'Lobby not found!',
				lobbyCode: data.lobbyCode
			});
		}
	});

	user.on('lobby-leave', function() {
		var lobby = lobbyManager.getLobbyForUser(user.id);
		if (lobby != null) {
			lobbyManager.removeUserFromLobby(user.id, lobby.code)
		}
	});

	user.on('disconnect', function() {
		lobbyManager.removeUserFromLobby(user.id, user.session_id);
		delete users[user.id];
		console.log('User connected with id: ' + user.id);
	});





	user.on('admin-lobby-create', function(data) {
		lobbyManager.createLobby(data.lobbyCode);
	});

	user.on('admin-lobby-close', function(data) {
		lobbyManager.closeLobby(data.lobbyCode);
	});
});


// Start server :)
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
http.listen(port, ip, function() {
	console.log('Server started on port ' + port + '.');
});
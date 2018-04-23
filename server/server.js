#!/bin/env node

//TODO: Implement namespaces/rooms to separate different lobbies, as well as user/admin roles!
// https://socket.io/docs/rooms-and-namespaces/

var express = require('express');
var http = require('http').Server();
var io = require('socket.io')(http);
var users = require('./users.js').userList;	// central user list for all lobbies!
var LobbyManager = require('./lobbymanager.js');

var lobbyManager = new LobbyManager();

io.on('connection', function(user) {
	
	users[user.id] = user;
	console.log('User connected with id: ' + user.id);

	// data = {lobbyCode: 'abcd'}
	// callback = callback passed by client so we can send a success/fail response
	user.on('lobby-join', function(data, clientResponseCallback) {
		var success = lobbyManager.addUserToLobby(user.id, data.lobbyCode);
		if (success)
			users[user.id].lobbyCode = data.lobbyCode;

		clientResponseCallback({
			lobbyCode: data.lobbyCode,
			success: success
		});
	});

	user.on('activity-input', function(data) {
		var lobby = lobbyManager.getLobby(users[user.id].lobbyCode);
		if (lobby != null) {
			lobby.receiveInput(user.id, data);
		}
		else {
			console.log("WARNING: Tried to update activity data but no lobby found");
		}
	});

	user.on('lobby-leave', function() {
		var code = users[user.id].lobbyCode;
		console.log('LOG: User ' + user.id + ' disconnected from lobby ' + (code != null) ? code : '');
		lobbyManager.removeUserFromLobby(user.id);
	});

	user.on('disconnect', function() {
		console.log('DISCONNECT');
		lobbyManager.removeUserFromLobby(user.id);
		
		console.log('LOG: User ' + user.id + ' disconnected.');
		delete users[user.id];
	});


	user.on('admin-lobby-create', function(data) {
		lobbyManager.createLobby(data.lobbyCode);
	});

	user.on('admin-lobby-close', function(data) {
		console.log('RECEIVE [ADMIN-LOBBY-CLOSE]');
		lobbyManager.closeLobby(data.lobbyCode);
	});


});


// Start server :)
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
http.listen(port, ip, function() {
	console.log('Server started on port ' + port + '.');
});
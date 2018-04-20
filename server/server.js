#!/bin/env node

//TODO: Implement namespaces/rooms to separate different lobbies, as well as user/admin roles!
// https://socket.io/docs/rooms-and-namespaces/

var express = require('express');
var http = require('http').Server();
var io = require('socket.io')(http);
var users = require('./users.js').userList;	// central user list for all lobbies!
var lobbyManager = require('./lobbymanager.js');

io.on('connection', function(user) {
	
	users[user.id] = user;
	console.log('User connected with id: ' + user.id);

	// data = {lobbyCode: 'abcd'}
	user.on('lobby-join', function(data, clientResponse) {
		clientResponse({
			lobbyCode: data.lobbyCode,
			success: lobbyManager.addUserToLobby(user.id, data.lobbyCode)
		});

		user.on('activity-input', function(data) {
			console.log('LOG: Activity input received: ' + data.content);
		});
	});

	user.on('lobby-leave', function() {
		console.log('LOG: User ' + user.id + ' disconnected from lobby ' + lobbyManager.getLobbyForUser(user.id));
		lobbyManager.removeUserFromLobby(user.id);
	});

	user.on('disconnect', function() {
		lobbyManager.removeUserFromLobby(user.id);
		
		console.log('LOG: User ' + user.id + ' disconnected.');
		delete users[user.id];
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
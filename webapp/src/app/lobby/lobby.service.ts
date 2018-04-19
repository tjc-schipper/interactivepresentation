import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';

@Injectable()
export class LobbyService {

  connection = null;
  connectedLobbyName:string = "";
  errors:string = "";

  constructor(private router: Router, private socket: SocketService) { }

  isConnected = function() {
    //TODO: Do HTTP request to check that the server knows about us...
    if (this.connectedLobbyName != "") {
      return true;      
    }
    else {
      return false;
    }
  }

  doConnect(lobbyCode:string) {
    //TODO: Connect to the Node server and register as connected to the room with code lobbyCode.
    // If error, return false
    // Else return true
    console.log("Attempt connection to lobby " + lobbyCode);

    this.socket.on('lobby-join-success', function() {
      this.handleJoinSuccess
    });
    this.socket.on('lobby-join-failed', function() {
      this.handleJoinFailed
    });

    this.socket.send('lobby-join', {lobbyCode: lobbyCode});
  }

  handleJoinSuccess(data) {
    //this.socket.removeOn('lobby-join-success', this.handleJoinSuccess);
    //this.socket.removeOn('lobby-join-failed', this.handleJoinFailed);
    console.log("SUCCESSSSS");
    this.connectedLobbyName = data.lobbyCode;
    this.router.navigate(['participate/' + data.lobbyCode]);
  }

  handleJoinFailed(data) {
    //this.socket.removeOn('lobby-join-success', this.handleJoinSuccess);
    //this.socket.removeOn('lobby-join-failed', this.handleJoinFailed);
    console.log("WARNING: Unable to join lobby with code " + data.lobbyCode);
  }

}

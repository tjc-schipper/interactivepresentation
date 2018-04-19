import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LobbyService {

  connection = null;
  connectedLobbyName:string = "";
  errors:string = "";

  constructor(private router: Router) { }

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
    console.log("Attempted connection to lobby: " + lobbyCode + ".");
    //this.errors = "Attempted connection to " + lobbyCode + "!";
    this.connectedLobbyName = lobbyCode;
    this.router.navigate(['participate/' + lobbyCode]);
    return true;
  }

}

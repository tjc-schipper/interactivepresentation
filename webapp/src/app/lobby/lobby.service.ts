import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';

@Injectable()
export class LobbyService {

  lobby:string = "";

  constructor(private router: Router, private socketService: SocketService) { }

  attemptJoin(lobbyCode:string) {
    var responseHandler = (function(response) {
      if (response.success)
        this.navigateTo(response.lobbyCode);
      //else showError! TODO
    }).bind(this);

    this.socketService.getSocket().emit('lobby-join', {lobbyCode: lobbyCode}, responseHandler);
  }

  navigateTo(lobbyCode) {
    this.lobby = lobbyCode;
    this.router.navigate(['participate/' + lobbyCode]);
  }

}

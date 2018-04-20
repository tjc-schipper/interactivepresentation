import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { SocketService } from '../socket.service';

@Injectable()
export class LobbyService {

  lobby:string = "";

  constructor(private route: ActivatedRoute, private router: Router, private socketService: SocketService) { }

  attemptJoin(lobbyCode:string) {
    var responseHandler = (function(response) {
      if (response.success) {
        if (window.location.href.indexOf('participate') != -1)
          this.navigateTo(response.lobbyCode);
        else if (window.location.href.indexOf('view') != -1) {
          this.navigateViewer(response.lobbyCode);
        }
      }
      //else showError! TODO
    }).bind(this);

    this.socketService.getSocket().emit('lobby-join', {lobbyCode: lobbyCode}, responseHandler);
  }

  navigateTo(lobbyCode:string) {
    this.lobby = lobbyCode;
    this.router.navigate(['participate/' + lobbyCode]);
  }

  navigateViewer(lobbyCode:string) {
    this.lobby = lobbyCode;
    this.router.navigate(['view/' + lobbyCode]);
  }

}

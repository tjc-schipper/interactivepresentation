import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { SocketService } from '../socket.service';
import { ActivityService } from '../viewer/activity.service';

@Injectable()
export class LobbyService {

  @Output() lobbyConnected: EventEmitter<string> = new EventEmitter();
  @Output() lobbyDisconnected: EventEmitter<any> = new EventEmitter();

  lobby:string = "";

  constructor(private route: ActivatedRoute, private router: Router, private socketService: SocketService) { }



  // Connect methods for Participate
  attemptJoin(lobbyCode:string) {
    var responseHandler = (function(response) {
      if (response.success)
        this.joinLobby(response.lobbyCode);
      //TODO: else showError!
    }).bind(this);

    this.socketService.getSocket().emit('lobby-join', {lobbyCode: lobbyCode}, responseHandler);
  }

  private joinLobby(lobbyCode:string) {
    this.lobby = lobbyCode;
    this.router.navigate(['participate/' + lobbyCode]);

    if (this.lobbyConnected != null)
      this.lobbyConnected.emit(this.lobby);
  }

  public leaveLobby() {
    this.socketService.send('lobby-leave', {});
    this.router.navigate(['participate']);

    if (this.lobbyDisconnected != null)
      this.lobbyDisconnected.emit();
  }




  // Connect methods for Viewer
  public attemptViewerJoin(lobbyCode: string) {
    var responseHandler = (function(response) {
      if (response.success)
        this.joinViewerLobby(response.lobbyCode);
      //TODO: else showError!
    }).bind(this);

    this.socketService.getSocket().emit('lobby-join', {lobbyCode: lobbyCode}, responseHandler);
  }

  private joinViewerLobby(lobbyCode: string) {
    this.lobby = lobbyCode;
    this.router.navigate(['view/' + lobbyCode]);

    if (this.lobbyConnected != null)
      this.lobbyConnected.emit(this.lobby);
  }

  public leaveViewerLobby() {
    this.socketService.send('lobby-leave', {});
    this.router.navigate(['view']);

    if (this.lobbyDisconnected != null)
      this.lobbyDisconnected.emit();
  }



}

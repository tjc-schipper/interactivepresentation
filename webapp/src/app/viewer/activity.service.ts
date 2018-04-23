import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { LobbyService } from '../lobby/lobby.service';

@Injectable()
export class ActivityService {

  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();
  @Output() dataSync: EventEmitter<any> = new EventEmitter();

  constructor(private socket: SocketService, private lobbyService: LobbyService) { 
    console.log("Subscribing to lobby events");
    this.lobbyService.lobbyConnected.subscribe(this.startListening.bind(this));
    this.lobbyService.lobbyDisconnected.subscribe(this.stopListening.bind(this));
  }

  public startListening(lobbyCode: string) {
    this.socket.on('activity-update', (function(data) {
      this.handleActivityUpdate(data);
    }).bind(this));

    this.socket.on('activity-sync', (function(data) {
      this.handleActivitySync(data);
    }).bind(this));

    console.log("Started listening for data updates");
  }

  public stopListening() {
    this.socket.removeOn('activity-update', (function(data) {
      this.handleActivityUpdate(data);
    }).bind(this));

    this.socket.removeOn('activity-sync', (function(data) {
      this.handleActivitySync(data);
    }).bind(this));

    console.log("Stopped listening for data updates");
  }

  private handleActivityUpdate(data:any) {
    console.log("Received activity-update!");
    console.dir(data);
    if (data != null && this.dataUpdated != null)
      this.dataUpdated.emit(data);
  }

  private handleActivitySync(data:any) {
    console.log("Received activity-sync!");
    console.dir(data);
    if (data != null && this.dataSync != null)
      this.dataSync.emit(data);
  }


}

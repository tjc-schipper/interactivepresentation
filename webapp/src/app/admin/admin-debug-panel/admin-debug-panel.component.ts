import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-admin-debug-panel',
  templateUrl: './admin-debug-panel.component.html',
  styleUrls: ['./admin-debug-panel.component.css']
})
export class AdminDebugPanelComponent implements OnInit {

  constructor(private socket: SocketService) { }

  ngOnInit() {
  }

  create() {
  	this.socket.send('admin-lobby-create', {lobbyCode: 'abcd'});
  }

  close() {
    this.socket.send('admin-lobby-close', {lobbyCode: 'abcd'});
  }

  next() {
    this.socket.send('admin-lobby-next-activity', {lobbyCode: 'abcd'});
  }

  checkConnection() {
  	return ((this.socket != null) && (this.socket.hasConnection()));
  }

}

import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-admin-debug-panel',
  templateUrl: './admin-debug-panel.component.html',
  styleUrls: ['./admin-debug-panel.component.css']
})
export class AdminDebugPanelComponent implements OnInit {

  constructor(private socket: SocketService) { }

  lobbyCode: string = "";

  ngOnInit() {
  }

  create(code:string) {
  	if (code != null && code != "")
      this.socket.send('admin-lobby-create', {lobbyCode: code});
  }

  close(code:string) {
    if (code != null && code != "")
      this.socket.send('admin-lobby-close', {lobbyCode: code});
  }

  next() {
    this.socket.send('admin-lobby-next-activity', {lobbyCode: 'abcd'});
  }

  checkConnection() {
  	return ((this.socket != null) && (this.socket.hasConnection()));
  }

}

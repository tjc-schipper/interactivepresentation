import { Component, OnInit } from '@angular/core';
import { LobbyService } from '../../lobby/lobby.service';

@Component({
  selector: 'app-connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.css']
})
export class ConnectFormComponent implements OnInit {

  lobbyCode:string = "";
  currentError:string = "";

  constructor(private lobbyService:LobbyService) { }

  ngOnInit() {
  }

  onClickConnect = function() {
    this.lobbyService.attemptJoin(this.lobbyCode);
  }

  isValidRoomName = function() {
    return (this.lobbyCode.length == 4);
  }

}

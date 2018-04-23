import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LobbyService } from '../../lobby/lobby.service';

@Component({
  selector: 'app-connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.css']
})
export class ConnectFormComponent implements OnInit {

  lobbyCode:string = "";
  currentError:string = "";

  @Output() onSubmit: EventEmitter<string> = new EventEmitter();

  constructor(private lobbyService:LobbyService) { }

  ngOnInit() {
  }

  onClickConnect = function() {
    if (this.onSubmit != null)
      this.onSubmit.emit(this.lobbyCode);
    //this.lobbyService.attemptJoin(this.lobbyCode);
  }

  isValidRoomName = function() {
    return (this.lobbyCode.length == 4);
  }

}

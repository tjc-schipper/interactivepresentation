import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service';
import { LobbyService } from '../lobby.service';

@Component({
  selector: 'app-lobbyheader',
  templateUrl: './lobbyheader.component.html',
  styleUrls: ['./lobbyheader.component.css']
})
export class LobbyHeaderComponent implements OnInit {
	
	@Input('lobbycode') lobbyCode:string = "aaaa";

  constructor(private router: Router, private socketService: SocketService, private lobbyService: LobbyService) { }

  ngOnInit() {
  }

  onClickBack() {
  	this.lobbyService.leaveLobby();
  }

}
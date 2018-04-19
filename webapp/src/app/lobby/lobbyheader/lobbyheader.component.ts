import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobbyheader',
  templateUrl: './lobbyheader.component.html',
  styleUrls: ['./lobbyheader.component.css']
})
export class LobbyHeaderComponent implements OnInit {
	
	@Input('lobbycode') lobbyCode:string = "aaaa";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClickBack() {
  	//TODO: Disconnect! Handle?
  	this.router.navigate(['participate']);
  }

}
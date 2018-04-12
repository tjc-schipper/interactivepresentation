import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lobbypage',
  templateUrl: './lobbypage.component.html',
  styleUrls: ['./lobbypage.component.css']
})
export class LobbyPageComponent implements OnInit {

  lobbyCode:string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.lobbyCode = this.route.snapshot.params['code'];
  }

}

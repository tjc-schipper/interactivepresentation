import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConnectFormComponent } from '../connect-form/connect-form.component';

import { LobbyService } from '../../lobby/lobby.service';

@Component({
  selector: 'app-connect-page',
  templateUrl: './connect-page.component.html',
  styleUrls: ['./connect-page.component.css']
})
export class ConnectPageComponent implements OnInit {

  @ViewChild(ConnectFormComponent) connectForm: ConnectFormComponent;

  constructor(private lobbyService: LobbyService) { }

  ngOnInit() {
    this.connectForm.onSubmit.subscribe((function(lobbyCode:string) {
      this.lobbyService.attemptJoin(lobbyCode);
    }).bind(this));
  }

}

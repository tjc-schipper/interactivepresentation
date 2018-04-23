import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectFormComponent } from '../../login/connect-form/connect-form.component';
import { LobbyService } from '../../lobby/lobby.service';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-view-connect-page',
  templateUrl: './view-connect-page.component.html',
  styleUrls: ['./view-connect-page.component.css']
})
export class ViewConnectPageComponent implements OnInit {

  @ViewChild(ConnectFormComponent) connectForm: ConnectFormComponent;

  constructor(private lobbyService: LobbyService, private activities: ActivityService) { }

  ngOnInit() {
    this.connectForm.onSubmit.subscribe((function(lobbyCode: string) {
      this.lobbyService.attemptViewerJoin(lobbyCode);
    }).bind(this));
  }

  onAttemptConnect(lobbyCode: string) {
    this.connectForm.onSubmit.subscribe((function(lobbyCode:string){
      this.lobbyService.attemptViewerJoin(lobbyCode);
    }).bind(this));
  }

}

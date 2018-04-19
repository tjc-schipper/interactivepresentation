import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ActivityStatus } from '../../activities/activitystatus';

@Component({
  selector: 'app-lobbypage',
  templateUrl: './lobbypage.component.html',
  styleUrls: ['./lobbypage.component.css']
})
export class LobbyPageComponent implements OnInit {

  lobbyCode:string = "";

  debug_mockIndex = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	this.lobbyCode = this.route.snapshot.params['code'];
  }

  handleActivityUpdate(status: ActivityStatus) {
    console.log('Set activity to: ' + status.activityID);
    this.router.navigate([status.activityID], {relativeTo: this.route});
  }

  // Called from debug button!
  debug_mockUpdate() {
    let id = this.debug_mockIndex ? 'wait' : '1';
    let mockStatus = new ActivityStatus(id);
    this.debug_mockIndex = !this.debug_mockIndex;
    
    this.handleActivityUpdate(mockStatus);
  }

}

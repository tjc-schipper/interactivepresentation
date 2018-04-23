import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-view-example',
  templateUrl: './view-example.component.html',
  styleUrls: ['./view-example.component.css']
})
export class ViewExampleComponent implements OnInit {

  data: {user_id:string, content:string}[] = [];

  constructor(private activity: ActivityService) { }

  ngOnInit() {
    this.activity.dataUpdated.subscribe(this.handleUpdate.bind(this));
  }

  handleUpdate(newEntry:any) {
    this.data.push(newEntry.content);
  }

}

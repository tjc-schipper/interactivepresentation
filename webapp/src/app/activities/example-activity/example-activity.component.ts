import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-example-activity',
  templateUrl: './example-activity.component.html',
  styleUrls: ['./example-activity.component.css']
})
export class ExampleActivityComponent implements OnInit {

  message: string = "";

  constructor(private socketService: SocketService) {}

  ngOnInit() {
  }

  onSubmit() {
    this.socketService.send('activity-input', {content: this.message});
  	console.log("Submitted: " + this.message);
  	this.message = "";
  }

  hasMessage() {
    return this.message.length > 0;
  }

}

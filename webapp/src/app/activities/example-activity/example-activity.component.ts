import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-activity',
  templateUrl: './example-activity.component.html',
  styleUrls: ['./example-activity.component.css']
})
export class ExampleActivityComponent implements OnInit {

  message: string = "";

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  	console.log("Submitted: " + this.message);
  	this.message = "";
  }

  hasMessage() {
    return this.message.length > 0;
  }

}

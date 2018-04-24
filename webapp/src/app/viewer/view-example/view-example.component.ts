//https://coursetro.com/posts/code/126/Let's-build-an-Angular-5-Chart.js-App---Tutorial
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivityService } from '../activity.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-view-example',
  templateUrl: './view-example.component.html',
  styleUrls: ['./view-example.component.css']
})
export class ViewExampleComponent implements OnInit {

  @ViewChild('chartAnchor') chartAnchor: ElementRef;
  chart: Chart;

  data: DataContainer[] = [];

  width = 600;
  height = 500;
  radius = 100;

  constructor(private activity: ActivityService) { }

  ngOnInit() {
    this.initGraph();
    this.activity.dataUpdated.subscribe(this.handleUpdate.bind(this));
  }

  handleUpdate(newEntry:any) {
    this.data.push(newEntry.content);
    console.log('handling update');
    this.chart.data = this.getNumEntries(this.data);
    console.log('updating graph');
    this.chart.update();
  }

  initGraph() {
    console.log('initing graph');
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['numEntries'],        
        data: this.getNumEntries(this.data),
      }
    });
  }

  getNumEntries(data: DataContainer[]) {
    var l = data.length;
    console.log('getting num entries: ' + l);
    return [l];
  }

}

class DataContainer {
  user_id: string;
  content: string;
}

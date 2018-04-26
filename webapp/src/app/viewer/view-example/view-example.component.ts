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

  groupedData: Map<string, number> = new Map();

  // chart setup
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
    this.processData([newEntry]);
    this.updateChart();

    console.log('handling update');
    this.chart.config.data.datasets[0] = this.getNumEntries(this.data);
    console.log('updating graph');
    this.chart.update();
  }

  handleSync(sync:any) {
    this.data = sync;
    this.processData(this.data);
    this.updateChart();
  }

  updateChart() {

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

  // Process entries in this.data and group them by value (content), assigning to this.groupedData
  // Takes array of DataContainers, so can be used for merging in activity-updates as well as initing using activity-sync!
  // (As long as you clear this.groupedData before processing a sync!)
  processData(data: DataContainer[]) {
    var grouped: Map<string, number> = this.groupedData;
    data.forEach(function(entry) {
      var currentCount = grouped.get(entry.content);
      if (currentCount == null)
        currentCount = 0;

      grouped.set(entry.content, currentCount + 1);
    });
    
  }

}

class DataContainer {
  user_id: string;
  content: string;
}

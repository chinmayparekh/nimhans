import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetService } from './assetdiv.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-assetdiv',
  templateUrl: './assetdiv.component.html',
  styleUrls: ['./assetdiv.component.scss']
})
export class AssetdivComponent implements OnInit {

  data1=[];
  data2 = [];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private assetService: AssetService) { }

  ngOnInit(): void 
  {

    this.assetService.getJSON().subscribe(data => {
      console.log(data);
      for(var i=0; i<data.length; i++)
      {
        this.data1.push(data[i].internalCasesCount);
        this.data2.push(data[i].externalCasesCount);
      }
    });

    
    console.log("data1 ",this.data1);
    console.log("data2 ",this.data2);

    this.initializeChart();
    this.populateChart();  
  }

    private initializeChart():void
    {
      this.chartOptions = {
        series: [
          {
            name: "Internal Samples",
            data: [],
          },
          {
            name: "External Samples",
            data: [],
          }
        ],
        chart: {
          height: 350,
          type: "bar",
        },
        title: {
          text: "Sample Chart"
        },
        xaxis: {
          categories: ["Jan", "Feb",  "Mar", "Apr", "May", "June"],
        }
      };
    }

    private populateChart():void
    {
      console.log(typeof(this.data1));
      console.log(typeof(this.data2));
      console.log(typeof([1,2,4,4,5]));
      this.chartOptions.series=
        [{
          name: "Internal Samples",
          // data: [1,2,3,4,5,6],
          data: this.data1,
        },
        {
          name: "External Samples",
          // data: [2,4,6,8,9,1],
          data:this.data2,
        }];
      
    }
}

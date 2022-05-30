import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetService } from './assetdiv.service';
import { DatePipe } from '@angular/common';
import { TurnAroundTimeService } from '../turn-around-time/turn-around-time.service';

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
  startDate:any;
  endDate:any;
  data1=[];
  data2 = [];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private turnAroundTimeService: TurnAroundTimeService, private assetService: AssetService,private datepipe: DatePipe) {}

  ngOnInit(): void 
  {
    
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 6);
    this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.initializeChart();
    this.populateChart(this.startDate, this.endDate);

    //called when new dates are passed
    this.turnAroundTimeService.dates.subscribe((dates: string[]) => {
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.data1=[];
      this.data2 = [];
      this.populateChart(this.startDate, this.endDate);
    });


    // console.log("Date", this.startDate);
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
          // categories: [],
        }
      };
    }

    private populateChart(startd :any , endd : any):void
    {
      this.assetService.getJSON(startd, endd).subscribe(data => {
        console.log(data);
  
        //Creating separate arrays for internal and external cases
        for(var i=0; i<data.length; i++)
        {
          this.data1.push(data[i].internalCasesCount);
          this.data2.push(data[i].externalCasesCount);
        }
      });
  
      
      console.log("data1 ",this.data1);
      console.log("data2 ",this.data2);
     
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

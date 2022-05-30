import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

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

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void 
  {

    this.getJSON().subscribe(data => {
      console.log(data);
    });

    console.log("SIKE");

    this.initializeChart();
    this.populateChart();  
  }

  public getJSON(): Observable<any> 
  {
    return this.http.get("http://localhost:4200/api/dashboard/assetDivision/{specimen}/{startTime}/{endTime}"); //NEED TO CHANGE
  }

    private initializeChart():void
    {
      this.chartOptions = {
        series: [
          {
            name: "Samples",
            data: []
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        title: {
          text: "Sample Chart"
        },
        xaxis: {
          categories: ["Jan", "Feb",  "Mar"]
        }
      };
    }

    private populateChart():void
    {
      this.chartOptions.series=
        [{
          name: "Sample1",
          data: [69, 43, 17]
        },
        {
          name: "Sample2",
          data: [33, 15, 69]
        }];
      
    }
}

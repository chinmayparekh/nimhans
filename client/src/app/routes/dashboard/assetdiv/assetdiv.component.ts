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

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private assetService: AssetService) { }

  ngOnInit(): void 
  {

    this.assetService.getJSON().subscribe(data => {
      console.log(data);
    });

    console.log("SIKE");

    this.initializeChart();
    this.populateChart();  
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TurnAroundTimeService } from '../turn-around-time/turn-around-time.service';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle} from "ng-apexcharts";
import { start } from 'repl';
import { AssetService } from '../assetdiv/assetdiv.service';

export type ChartOptions = {series: ApexAxisChartSeries; chart: ApexChart; xaxis: ApexXAxis; title: ApexTitleSubtitle;};


@Component({
  selector: 'app-annual-rep',
  templateUrl: './annual-rep.component.html',
  styleUrls: ['./annual-rep.component.scss']
})
export class AnnualRepComponent implements OnInit {

  startDate:any;
  endDate:any;
  newdata=[]; 
  newCategories=[];
  numMonths : Number;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; //Used to get Xaxis

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private turnAroundTimeService: TurnAroundTimeService, private assetService: AssetService,private datepipe: DatePipe) {}

  ngOnInit(): void 
  {
    //Setting initial date
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 6);
    this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    

    this.initializeChart();//Initializes chart

    //called when new dates are passed
    this.turnAroundTimeService.dates.subscribe((dates: string[]) => 
    {
      this.startDate = dates[0];
      this.endDate = dates[1];
      // this.newdata=[];
      this.newCategories=[];
      this.sendReq(this.startDate, this.endDate); //Sends HTTP GET Request to get Sample Data
      console.log("cat", this.newCategories);
    });


    // console.log("Date", this.startDate);
  }
  private sendReq(startd :any , endd : any):void
  {
    //HTTP GET Request
    this.assetService.getAnnualRep(startd, endd).subscribe(data => {
    this.numMonths = data.length;
    this.newdata =[...data];
    var startMonth = parseInt(startd.slice(5,7)) -1;

    //dynamically creating x-axis
    for(var i=0; i<this.numMonths; i++)
    {
      //Getting X-Axis
      //newCategories[] is x-axis labels 
      if( startMonth == 11) //If month is Dec, reset to Jan
        {
          this.newCategories.push(this.months[startMonth]);
          console.log("new pushed", this.newCategories);
          startMonth=0;
          continue;
        }
        else 
        {
          this.newCategories.push(this.months[startMonth]);
          console.log("new pushed", this.newCategories, " startMonth ", startMonth);
          startMonth++;
        }
    }
    console.log("old ", data, " new ", this.newdata);
    this.populateChart();
    });
  }

    private initializeChart():void
    {
      this.chartOptions = {
        series: [
          {
            name: "Samples",
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
          categories: [],
        }
      };
    }


    private populateChart():void
    {
      console.log("new data ",this.newdata);
      this.chartOptions = {
        series: [
          {
            name: "Samples",
            data: this.newdata,
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
          categories: this.newCategories,
        }
      };
      
    }

}

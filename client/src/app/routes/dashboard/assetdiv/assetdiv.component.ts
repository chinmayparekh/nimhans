import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AssetService } from './assetdiv.service';
import { DatePipe } from '@angular/common';
import { TurnAroundTimeService } from '../turn-around-time/turn-around-time.service';
import {ChartComponent, ApexAxisChartSeries, ApexChart,ApexXAxis, ApexTitleSubtitle} from "ng-apexcharts";
import { DropdownMenuComponent } from '../turn-around-time/utils/dropdown-menu/dropdown-menu.component';
import { start } from 'repl';

export type ChartOptions = {series: ApexAxisChartSeries; chart: ApexChart; xaxis: ApexXAxis; title: ApexTitleSubtitle;};

@Component({
  selector: 'app-assetdiv',
  templateUrl: './assetdiv.component.html',
  styleUrls: ['./assetdiv.component.scss']
})

export class AssetdivComponent implements OnInit {
  startDate:any;
  endDate:any;
  dropdown = new DropdownMenuComponent();
  data1=[]; //Internal Samples
  data2 = []; //External Samples
  newCategories=[];
  numMonths : Number;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; //Used to get Xaxis
  //@Input() showToggle = true;
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
      this.data1=[];
      this.data2 = [];
      this.newCategories=[];
      this.sendReq(this.startDate, this.endDate, this.dropdown.specType); //Sends HTTP GET Request to get Sample Data
      console.log("cat", this.newCategories);
    });


    // console.log("Date", this.startDate);
  }
  private sendReq(startd :any , endd : any, specType : string):void
  {
    console.log("Spec Type", specType);
    //HTTP GET Request
    this.assetService.getJSON(startd, endd, specType).subscribe(data => {
      console.log(data);
    this.numMonths = data.length;
    var startMonth = parseInt(startd.slice(5,7)) -1;

    //Creating separate arrays for internal and external cases and dynamically creating x-axis
    for(var i=0; i<this.numMonths; i++)
    {
      this.data1.push(data[i].internalCasesCount);
      this.data2.push(data[i].externalCasesCount);

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
    this.populateChart(); // Fills chart with Data fetched previously
    });
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
          categories: [],
        }
      };
    }


    private populateChart():void
    {
      console.log("data1 ",this.data1);
      console.log("data2 ",this.data2);
     
      this.chartOptions = {
        series: [
          {
            name: "Internal Samples",
            data: this.data1,
          },
          {
            name: "External Samples",
            data: this.data2,
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

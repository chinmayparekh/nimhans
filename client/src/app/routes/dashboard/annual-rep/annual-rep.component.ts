import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TurnAroundTimeService } from '../turn-around-time/turn-around-time.service';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle, ApexPlotOptions} from "ng-apexcharts";
import { start } from 'repl';
import { AssetService } from '../assetdiv/assetdiv.service';
import { AnnualRepService } from './annual-rep.service';

export type ChartOptions = {series: ApexAxisChartSeries; chart: ApexChart; xaxis: ApexXAxis; title: ApexTitleSubtitle;};


@Component({
  selector: 'app-annual-rep',
  templateUrl: './annual-rep.component.html',
  styleUrls: ['./annual-rep.component.scss']
})
export class AnnualRepComponent implements OnInit {
  specType: string;
  startDate:any;
  endDate:any;
  newdata=[];
  data1=[]; //Internal Samples
  data2 = []; //External Samples
  newCategories=[];
  numMonths : Number;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; //Used to get Xaxis
  // @Input() plotOptions: ApexPlotOptions;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public plotOptions: Partial<ApexPlotOptions>;

  constructor(private turnAroundTimeService: TurnAroundTimeService, private assetService: AssetService,private datepipe: DatePipe, private annualrepService: AnnualRepService) {}

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
      this.sendReq(this.startDate, this.endDate, this.specType); //Sends HTTP GET Request to get Sample Data
      console.log("cat", this.newCategories);
    });


    // console.log("Date", this.startDate);
  }

  selectChangeHandler(event:any)
  {
    this.specType = event.target.value;
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
        text: "Report"
      },
      xaxis: {
        categories: [
          'Choose Asset Type',
        ],
      }
    };
    
  }

  private sendReq(startd :any , endd : any, specType:string):void
  {
    var assetNumber =0;
    console.log("specType ", this.specType);
    //HTTP GET Request
    switch(specType){
      case "Case":
      {
        assetNumber = 0;
        break;
      }
      case "Sample":
      {
        assetNumber = 1;
        break;
      }
      case "Block":
      {
        assetNumber = 2;
        break;
      }
      case "Slide":
      {
        assetNumber = 3;
        break;
      }    
    }
    this.annualrepService.getAnnualRep(startd, endd, assetNumber).subscribe(data => {
    this.numMonths = data.length;
    this.newdata =[...data];
    var startMonth = parseInt(startd.slice(5,7)) -1;

    //dynamically creating x-axis
    this.getCatergories(specType);
      console.log("newcat ", this.newCategories);

    for(var i =0; i<this.numMonths; i++)
    {
      this.data1.push(data[i].internalCasesCount);
      this.data2.push(data[i].externalCasesCount);
    }
    console.log("data1 ", this.data1, " data2 ", this.data2);
    this.populateChart();
    });
  }

  private getCatergories(specType :string): void
  {
    switch(specType)
    {
      case "Block":
        {
          this.newCategories = [
            'Blocks',
            'Block',
          ];
          break;
        }
        case "Case":
        {
          this.newCategories = [
            'Blocks',
            'Epilepsy surgery',
            'Muscle biopsy',
            'Nerve biopsy',
            'NULL',
            'Others',
            'Sheet',
            'Skin biopsy',
            'Slides for Opinion',
            'Surgical Biopsy',
          ];
          break;
        }
        case "Sample":
        {
          this.newCategories = [
            'Epilepsy Surgery',
            'Muscle Biopsy',
            'Nerve Biopsy',
            'NULL',
            'Others',
            'Skin Biopsy',
            'Surgical Biopsy',
            'Multiple Biopsies',
            'Tissue',
          ];
          break;
        }
        case "Slide":
          {
            this.newCategories = [
              'Blocks',
              'Epilepsy surgery',
              'Muscle biopsy',
              'Nerve biopsy',
              'Tissue',
              'Skin biopsy',
              'Slides for Opinion',
              'Surgical Biopsy',
              'Block',
            ];
            break;
          }

    }

  }

    private populateChart():void
    {
      // console.log("new data ",this.newdata);
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
          text: "Report"
        },
        xaxis: {
          categories: this.newCategories,
        }
      };
      
    }

}

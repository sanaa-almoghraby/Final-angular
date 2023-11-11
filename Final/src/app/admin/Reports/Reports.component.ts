import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AdminService } from 'src/app/Services/admin.service';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserService } from 'src/app/Services/user.service';
import { GuestService } from 'src/app/Services/guest.service';

@Component({
  selector: 'app-Reports',
  templateUrl: './Reports.component.html',
  styleUrls: ['./Reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(public admin:AdminService , public us:UserService , public guest:GuestService) { }
  pieChartData: ChartData<'bar', number[], string | string[]> = { labels: [],
  datasets: []};

  pieChartData1: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [ {
      data: []
    } ]
  };

  total : any;
  lengthuser : any ;
  lengthevets : any ;
  lengthcategory : any;
  _StartDate:any;
  _EndDate:any;
  lengthtes:any;
  lengthreviews:any;

  async ngOnInit() {
    await this.admin.getuserall().then( data => {
      
      this.admin.users =  data;
      this.lengthuser = data.filter((user: any) => user.roleid === 2).length;
     });

     await this.admin.getAllTestimonial().then(data => {
      this.admin.testimonials = data.filter((e: any) => e.isaccepted == 1);
      this.lengthtes = data.length;
    });

     await this.admin.getallcategory().then( data => {
      
      this.admin.categorys =  data;
      this.lengthcategory = data.length;
     });

     await this.guest.getallReview().then(data => {
      this.guest.reviews = data;
      this.lengthreviews = data.length;
    });

     await this.admin.getAllEvents().then( data => {
      
      this.admin.events =  data.filter((event: any) => event.ispayed === 1);
      this.lengthevets = data.filter((event: any) => event.ispayed === 1).length;
      this.pieChartData = {
        labels: [ 'Users' , 'Events Active' , 'Categorys' , 'Testimonials' ],
        datasets: [ {
          data: [ this.lengthuser , this.lengthevets , this.lengthcategory , this.lengthtes ]
        } ]
      };    

      this.pieChartData1 = {
        labels: [ 'Reviews', 'Users' ],
        datasets: [ {
          data: [ this.lengthreviews , this.lengthuser ]
        } ]
      };

     });

     await this.us.getAllUserEvents().then(async data => {
      this.us.registersevent = data;
    });

    }

    

    getnumberregister(id:any): any{

      return this.us.registersevent.filter((re:any) => re.eventid == id).length;
  
    }

    getcategorybyid(id:any) : any{ 
      return this.admin.categorys.find((c:any )=> c.categoryid == id);
    }

    calculateTotalPrice(filteredEvents: any[]): number {
      this.total=filteredEvents.reduce((total, event) => total + (this.getcategorybyid(event.categoryid)?.price || 0), 0);
      return this.total;
      }

      async filterdata(){
        let lenght ;
        
        if( this._StartDate == undefined && this._EndDate == undefined)
        lenght = this.admin.events.length;

        else if( this._StartDate != undefined && this._EndDate == undefined)
        lenght = this.admin.events.filter((e:any) => e.startdate > this._StartDate).length;

        else if( this._StartDate == undefined && this._EndDate != undefined)
        lenght = this.admin.events.filter((e:any) => e.startdate < this._EndDate).length;

        else
        lenght = this.admin.events.filter((e:any) => e.startdate > this._StartDate && e.startdate < this._EndDate).length;

        this.pieChartData = {
          labels: [ 'Users' , 'Events Active' , 'Categorys' , 'Testimonials' ],
          datasets: [ {
            data: [ this.lengthuser , lenght , this.lengthcategory , this.lengthtes ]
          } ]
        };   

      }


//----------------------------------------------------- chart ----------------------------------------------

      @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

      // Pie
      public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        plugins: {
          legend: {      
            display: false,
          },
          datalabels: {
            formatter: (value, ctx) => {
              if (ctx.chart.data.labels) {
                return ctx.chart.data.labels[ctx.dataIndex];
              }
              return ''; // Provide a default return value
            },
          }
        }
      };
      
      pieChartPlugins: any[] = [
        // Define your plugins here
        {
          id: 'custom-labels', // A unique ID for the plugin
          beforeDraw(chart: any) {
            // You can customize the chart before drawing here
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;
    
            // Draw custom text or elements on the chart
            ctx.font = '24px Arial';
            
          }
        }
      ];
       
    
      public pieChartType: ChartType = 'bar';
      
    
      // events
      public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {}
    
      public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {}

  //----------------------------------------------------------- chart 2 --------------------------------------------------------


  @ViewChild(BaseChartDirective) chart1: BaseChartDirective | undefined;

      // Pie
      public pieChartOptions1: ChartConfiguration['options'] = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          datalabels: {
            formatter: (value, ctx) => {
              if (ctx.chart.data.labels) {
                return ctx.chart.data.labels[ctx.dataIndex];
              }
              return ''; // Provide a default return value
            },
          },
        },
      };

      pieChartPlugins1: any[] = [
        // Define your plugins here
        {
          id: 'custom-labels', // A unique ID for the plugin
          beforeDraw(chart: any) {
            // You can customize the chart before drawing here
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;
    
            // Draw custom text or elements on the chart
            ctx.font = '24px Arial';
            
          }
        }
      ];
      
      public pieChartType1: ChartType = 'pie';
      


// ------------------------------------------------ pdf --------------------------------------------------

  @ViewChild('reportContent') reportContent!: ElementRef;
  generatePDF(): void {

    
    const reportElement: HTMLElement = this.reportContent.nativeElement;
    const chartContainerElement: HTMLElement | null = document.getElementById('chartContainer');
  
    // Ensure that the chartContainerElement exists before proceeding
    if (!chartContainerElement) {
      console.error('Chart container element not found.');
      return;
    }
  
    // Create a Promise to capture the report content using html2canvas
    const captureReportPromise: Promise<HTMLCanvasElement> = html2canvas(reportElement);
  
    // Use Promise.all to wait for the capture to complete
    Promise.all([captureReportPromise]).then(([reportCanvas]) => {
      // Create a new jsPDF instance
      const pdf = new jsPDF();
  
      // Calculate the dimensions for the report content in the PDF
      const reportWidth = 190;
      const reportHeight = (reportCanvas.height / reportCanvas.width) * reportWidth;
  
      // Add the captured report content to the PDF
      pdf.addImage(reportCanvas.toDataURL('image/png'), 'PNG', 10, 10, reportWidth, reportHeight);
  
      // Save the PDF with a file name
      pdf.save('report.pdf');
    }).catch((error) => {
      console.error('Error capturing content:', error);
    });
  }
  

}

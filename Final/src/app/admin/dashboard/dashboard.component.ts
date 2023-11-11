import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';
import { GuestService } from 'src/app/Services/guest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public admin: AdminService, public us: UserService, public guest: GuestService) { }
  pieChartData: ChartData<'bar', number[], string | string[]> = {
    labels: [],
    datasets: []
  };

  pieChartData2: ChartData<'line', number[], string | string[]> = {
    labels: [],
    datasets: [ {
      data: []
    } ]
  };

  lengthuser: any;
  lengthevets: any;
  lengthcategory: any;
  lengthtes: any;
  maxeventregistered: any;
  nummaxregisterd: number = 0;
  sortevents: any = [{}];
  lengthreviews: any ;
  lengthreg:any ;

  getuserbyid(id: any): any {
    return this.admin.users.find((u: any) => u.userid == id);
  }

  async ngOnInit() {
    await this.admin.getuserall().then(data => {

      this.admin.users = data;
      this.lengthuser = data.filter((user: any) => user.roleid === 2).length;
    });

    await this.admin.getallcategory().then(data => {

      this.admin.categorys = data;
      this.lengthcategory = data.length;
    });

    await this.admin.getAllTestimonial().then(data => {
      this.admin.testimonials = data.filter((e: any) => e.isaccepted == 1);
      this.lengthtes = data.length;
    });

    await this.guest.getallReview().then(data => {
      this.guest.reviews = data;
      this.lengthreviews = data.length;
    });

    await this.us.getAllUserEvents().then(async data => {
      this.us.registersevent = data;
      this.lengthreg = data.length;
    });

    await this.admin.getAllEvents().then(data => {

      this.admin.events = data.filter((event: any) => event.ispayed === 1);

      this.sortevents = data.filter((event: any) => event.ispayed === 1);

      this.sortevents.sort((a: any, b: any) => {
        const dateA = new Date(a.createddate);
        const dateB = new Date(b.createddate);
        return dateB.getTime() - dateA.getTime();
      });


      this.lengthevets = data.filter((event: any) => event.ispayed == 1).length;

      this.pieChartData = {
        labels: ['Users', 'Events Active', 'Categorys', 'Testimonials'],
        datasets: [{
          data: [this.lengthuser, this.lengthevets, this.lengthcategory, this.lengthtes]
        }]
      };



      this.pieChartData2 = {
        labels: [ 'Number All Registers', 'Users' ],
        datasets: [ {
          data: [ this.lengthreg , this.lengthuser ]
        } ]
      };


    });

    

    await this.findMosMostAttribute().then(async data => {
      this.maxeventregistered = this.admin.events.find((e: any) => e.eventid == data);
    });

    

  }

  getcategorybyid(id: any): any {
    return this.admin.categorys.find((c: any) => c.categoryid == id);
  }

  getnumberregister(id:any): any{

    return this.us.registersevent.filter((re:any) => re.eventid == id).length;

  }


  async findMosMostAttribute(): Promise<any> {

    return new Promise((resolve, reject) => {
      let targetevent = 0;
      let max = 0;
      for (let obj of this.admin.events) {
        const registersevent = this.us.registersevent.filter((r: any) => r.eventid == obj.eventid);
        if (registersevent.length > max) {
          max = registersevent.length;
          targetevent = registersevent[0].eventid;
        }
      }
      this.nummaxregisterd = max;
      resolve(targetevent);
      reject(false);
    });
  }




  getdeffrentdate(date:any): any{


      const eventDate:any = new Date(date); // Parse the event date

      const currentDate:any = new Date(); // Get the current date

      // Calculate the time difference in milliseconds
      const timeDifference = currentDate - eventDate ;

      // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
      const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    return daysDifference;
  }





  //----------------------------------------------------------- chart 1 --------------------------------------------------------


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
  //public pieChartPlugins = [ DatalabelsPlugin ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void { }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void { }




      //----------------------------------------------------------- chart 2 --------------------------------------------------------


  @ViewChild(BaseChartDirective) chart2: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions2: ChartConfiguration['options'] = {
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
  
  public pieChartType2: ChartType = 'pie';
  public pieChartPlugins2 = [ DatalabelsPlugin ];

}

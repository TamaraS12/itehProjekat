
import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-statistics',
  templateUrl: './booking-statistics.component.html',
  styleUrls: ['./booking-statistics.component.scss']
})
export class BookingStatisticsComponent {

  basicData: any;

  basicOptions: any;

  constructor (private bookingService: BookingService ){ 

  }

  ngOnInit() {
      this.bookingService.getBookingsStatistics().subscribe((response)=>{
        console.log(response);
        const labels: string[] = response.map(value => value.title);
        const data: number[] = response.map(value => value.total);
        this.setStatistics(labels, data);
      })

  }

  setStatistics(labels: string[], data: number[]): void {

    const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    
      this.basicData = {
          labels: labels,
          datasets: [
              {
                  label: 'Solded booking statistics',
                  data: data,
                  backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                  borderColor: ['rgb(255, 159, 64)'],
                  borderWidth: 1
              }
          ]
      };

      this.basicOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }

}

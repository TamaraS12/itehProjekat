import { Component, OnInit } from '@angular/core';
import { Accommodation } from 'src/app/model/accommodation';
import { Booking } from 'src/app/model/booking';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { BookingService } from 'src/app/services/booking.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AccommodationDialogComponent } from '../accommodation-dialog/accommodation-dialog.component';
import { mergeMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss'],
  providers: [MessageService]
})
export class AccommodationsComponent implements OnInit {
  accommodations: Accommodation[] = [];
  get loggedUserRole(): number | null {
    return Number(localStorage.getItem('role'));
  }

  constructor(private accommodationService: AccommodationService,
              private bookingService: BookingService,
              private router: Router,
              private dialog: MatDialog,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
   

    this.accommodationService.getAccommodations().subscribe((response) => {
      
      this.accommodations = response;
    })
    
  }

  handleAccommodationClicked(accommodation: Accommodation): void {
    if (this.loggedUserRole === 1) {
      this.editAccommodation(accommodation);
    } else {
      this.addBooking(accommodation);
    }
  }

  addAccommodation(): void {
    this.dialog.open(AccommodationDialogComponent, {
      width: '50%'
    })
    .afterClosed()
    .subscribe((dialogResponse: {accommodation: Accommodation, file: File}) => {
      if (dialogResponse) {
        this.accommodationService.addAccommodation(dialogResponse.accommodation, dialogResponse.file).pipe(
          mergeMap(() => this.accommodationService.getAccommodations())
        ).subscribe((response) => {
          this.accommodations = response;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Accommodation successfuly added!' });
        })
      }
    })
  }

  editAccommodation(accommodation: Accommodation): void {
    this.dialog.open(AccommodationDialogComponent, {
      width: '50%',
      data: accommodation
    })
    .afterClosed()
    .subscribe((dialogResponse: {accommodation: Accommodation, file: File}) => {
      if (dialogResponse) {
        this.accommodationService.updateAccommodation(dialogResponse.accommodation).pipe(
          mergeMap(() => this.accommodationService.getAccommodations())
        ).subscribe((response) => {

          this.accommodations = response;

          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Accommodation successfuly updated!' });
        })
      }
    })
  }

  addBooking(accommodation: Accommodation): void {
    this.dialog.open(BookingDialogComponent, {
      width: '50%',
      data: {accommodation}
    })
    .afterClosed()
    .subscribe((booking: Booking) => {
      console.log(booking);
      if (booking) {
        this.bookingService.addBooking(booking).subscribe((response) => {
          console.log(response);
          this.router.navigate(['bookings']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Booking successfuly added!' });
        })
      }
    });
  }

  handleAccommodationDelete(accommodation: Accommodation): void {
    this.accommodationService.deleteAccommodation(accommodation.id).subscribe((response) => {

      const index = this.accommodations.findIndex(value => value.id === response.id);

      // pocevsi od ovog indexa obrisi jedan element
      this.accommodations.splice(index, 1);

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Accommodation deleted successfuly!' });
    })
  }
}

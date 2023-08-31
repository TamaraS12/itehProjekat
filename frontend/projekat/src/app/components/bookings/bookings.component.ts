import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { mergeMap } from 'rxjs';
import { Accommodation } from 'src/app/model/accommodation';
import { Booking } from 'src/app/model/booking';
import { User } from 'src/app/model/user';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { BookingService } from 'src/app/services/booking.service';
import { AccommodationDialogComponent } from '../accommodation-dialog/accommodation-dialog.component';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  providers: [MessageService]
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  accommodations: Accommodation[] = [];
  loggedInUser: User;

  @ViewChild('dt', { static: false }) dt: Table;

  constructor(private bookingService: BookingService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private accommodationService: AccommodationService) {
  }

  ngOnInit(): void {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    }
    this.getBookings();
    this.getAccommodations();
  }

  handleAccommodationClicked(accommodation: Accommodation): void {
    if (this.loggedInUser.role_id === 1) {
      this.editAccommodation(accommodation);
    } else {
      this.addBooking(accommodation);
    }
  }

  getBookings(): void {
    if (this.loggedInUser.role_id === 1) {
      this.bookingService.getAllBookings().subscribe((response) => {

        this.bookings = response;
      })
    } else {
      this.bookingService.getUserBookings(this.loggedInUser.id).subscribe((response) => {

        this.bookings = response;
      })
    }
  }

  getAccommodations(): void {
    this.accommodationService.getAccommodations().subscribe((response) => {
      console.log(response);
      this.accommodations = response;
    })
  }

  editBooking(booking: Booking): void {
    console.log(booking);
    this.dialog.open(BookingDialogComponent, {
      width: '50%',
      data: { accommodation: booking.accommodation, booking }
    })
      .afterClosed()
      .subscribe((booking: Booking) => {
        console.log(booking);
        if (booking) {
          this.bookingService.updateBooking(booking).subscribe((response) => {
            console.log(response);
            const index = this.bookings.findIndex(booking => booking.id === response.id);
            this.bookings[index] = response;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Booking successfuly updated!' });
          })
        }
      });
  }

  editAccommodation(accommodation: Accommodation): void {
    this.dialog.open(AccommodationDialogComponent, {
      width: '50%',
      data: accommodation
    })
      .afterClosed()
      .subscribe((dialogResponse: { accommodation: Accommodation, file: File }) => {
        console.log(dialogResponse);
        if (dialogResponse) {
          this.accommodationService.updateAccommodation(dialogResponse.accommodation).pipe(
            mergeMap(() => this.accommodationService.getAccommodations())
          ).subscribe((response) => {
            console.log(response);
            this.accommodations = response;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Accommodation successfuly updated!' });
          })
        }
      })
  }

  addBooking(accommodation: Accommodation): void {
    this.dialog.open(BookingDialogComponent, {
      width: '50%',
      data: { accommodation }
    })
      .afterClosed()
      .subscribe((booking: Booking) => {
        console.log(booking);
        if (booking) {
          this.bookingService.addBooking(booking).subscribe((response) => {
            console.log(response);
            this.bookings.push(response);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Booking successfuly added!' });
          })
        }
      });
  }

  handleInput(event: any): void {
    this.dt.filterGlobal(event.target.value, 'contains')
  }
}

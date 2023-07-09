import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { Accommodation } from 'src/app/model/accommodation';
import { Booking } from 'src/app/model/booking';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss'],
  providers: [DatePipe]
})
export class BookingDialogComponent implements OnInit {
  form: FormGroup;
  loggedInUser: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {accommodation: Accommodation, booking: Booking},
              public dialogRef: MatDialogRef<BookingDialogComponent>,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe) {}

  ngOnInit(): void {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    }

    this.form = this.formBuilder.group({
      number_of_persons: [null, Validators.required],
      date_from: [null, Validators.required],
      date_to: [null, Validators.required],
      price: [{value: null, disabled: true}],
      user: [{value: this.loggedInUser.name, disabled: true}],
      accommodation: [{value: this.data.accommodation.name, disabled: true}],
    });

    

    if (this.data?.booking) {
      this.form.patchValue({
        number_of_persons: this.data.booking.number_of_persons,
        date_from: this.data.booking.date_from,
        date_to: this.data.booking.date_to,
        price: this.data.booking.price
      })
    }

    this.form.valueChanges.pipe(debounceTime(300)).subscribe((formValues) => {
      if (formValues.number_of_persons) {
        console.log('promena: ' + formValues);
        this.form.patchValue({
          price: this.data.accommodation.price_per_person * Number(formValues.number_of_persons)
        })
      } else if (!formValues.number_of_persons) {
        this.form.patchValue({
          price: 0
        })
      }
    })
  }

  saveBooking(): void {
    const dateFrom = this.datePipe.transform(this.form.get('date_from')?.value, 'YYYY-MM-dd');
    const dateTo = this.datePipe.transform(this.form.get('date_to')?.value, 'YYYY-MM-dd');

    if (this.data.booking) {
      // edit
      const booking: Booking = {
        ...this.data.booking,
        date_from: dateFrom,
        date_to: dateTo,
        price: this.form.get('price')?.value,
        number_of_persons: this.form.get('number_of_persons')?.value
      };
      this.dialogRef.close(booking);
    } else {
      const booking: Booking = {
        accommodation_id: this.data.accommodation.id,
        user_id: this.loggedInUser.id,
        date_from: dateFrom,
        date_to: dateTo,
        price: this.form.get('price')?.value,
        number_of_persons: this.form.get('number_of_persons')?.value
      };
      this.dialogRef.close(booking);
    }
  }
  
}

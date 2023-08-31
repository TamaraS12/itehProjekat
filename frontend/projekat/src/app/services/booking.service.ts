import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { BookingStatistics } from '../model/booking-statistics';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private url: string = 'http://127.0.0.1:8000/api/';

  constructor(private httpClient: HttpClient) { }

  addBooking(booking: Booking): Observable<Booking> {
    return this.httpClient.post<Booking>(this.url + 'bookings/add', booking);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return this.httpClient.put<Booking>(this.url + 'bookings/update/' + booking.id, booking);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.url + 'bookings');
  }

  getUserBookings(userId: number): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.url + 'bookings/user/' + userId);
  }
 
  getBookingsStatistics(): Observable<BookingStatistics[]> {
    return this.httpClient.get<BookingStatistics[]>(this.url + 'bookings/statistics');
  }
  convertBookingPrice(price: number, currency: string): Observable<any> {  
    return this.httpClient.get<any>(this.url + 'currency/convert/' + currency + '/' +price);
  }
}

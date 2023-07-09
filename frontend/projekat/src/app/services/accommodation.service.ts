import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation } from '../model/accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private url: string = 'http://127.0.0.1:8000/api/';

  constructor(private httpClient: HttpClient) { }

  getAccommodations(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(this.url + 'accommodations');
  }

  addAccommodation(accommodation: Accommodation, file: File): Observable<Accommodation> {
    const formData = new FormData;
    formData.append('file', file);
    formData.append('photo', file.name);
    formData.append('name', accommodation.name);
    formData.append('location', accommodation.location);
    formData.append('type', accommodation.type);
    formData.append('capacity', accommodation.capacity as any);
    formData.append('price_per_person', accommodation.price_per_person as any);
    
    return this.httpClient.post<Accommodation>(this.url + 'accommodations/add', formData);
  }

  updateAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(this.url + 'accommodations/update/' + accommodation.id, accommodation);
  }

  deleteAccommodation(accommodationId: number): Observable<Accommodation> {
    return this.httpClient.delete<Accommodation>(this.url + 'accommodations/delete/' + accommodationId);
  }
}

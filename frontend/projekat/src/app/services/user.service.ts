import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://127.0.0.1:8000/api/';

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<User>{
    return this.httpClient.get<User>(this.url + 'profile');
  }
}

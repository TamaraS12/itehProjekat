import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { LogoutResponse } from '../model/logout-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://127.0.0.1:8000/api/';

  constructor(private httpClient: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.url + 'login', request);
  }

  logout(): Observable<LogoutResponse>{
    return this.httpClient.post<LogoutResponse>(this.url + 'logout', {});

  }
}

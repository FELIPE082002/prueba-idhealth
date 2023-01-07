import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  @Output() disparadorLogin: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  public token: string = '';
  
  login(user: any): Observable<any> {
    return this.http.post(environment.endPoint + '/auth/login', user);
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(){
    return this.token
  }
}

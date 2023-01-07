import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  private token:string | undefined

  setToken(token: string) {
    this.token = token
  }

  getToken(){
    return this.token
  }
}

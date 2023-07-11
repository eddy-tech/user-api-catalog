import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl : string = 'https://randomuser.me/api'

  constructor(private http: HttpClient) { }

  getUsers = (size: number = 10) : Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/?results=${size}`)
  }


  getUser = (uuid: number = 1) : Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/?uuid=${uuid}`)
  }

}

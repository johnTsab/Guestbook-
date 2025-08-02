import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Guest} from './guest';

@Injectable({
  providedIn: 'root'
})
export class GuestServService {

  constructor(private _httpClient:HttpClient) { }

  baseUrl : String = "/api/v1/guests";
  fetchAllGuests():Observable<Guest[]>{
    return this._httpClient.get<Guest[]>(`${this.baseUrl}`);
  }
}

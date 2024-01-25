import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Flight } from '../models/flight';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  flights: Flight[] = [];

  private apiUrl = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  getApiResponse() {
    this.http
      .get<Flight[]>(this.apiUrl).subscribe((response) => {
        this.flights = response;
      });
  }
}

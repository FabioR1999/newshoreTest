import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  multiplicationFactor: number = 1;

  private apiUrl = environment.apiUrlCurrency;

  constructor(private http: HttpClient) {}

  getCurrency(currency: string): Observable<number> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => 'Error en la llamada a la API');
        }),
        tap((response) => {
          // Aquí asumimos que el API responde con una estructura que tiene conversion_rates
          this.multiplicationFactor = response.conversion_rates[currency];
        }),
        map(() => this.multiplicationFactor),
        shareReplay()
      );
  }
}

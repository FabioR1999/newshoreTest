import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  multiplicationFactor: number = 1;

  private apiUrl = 'https://v6.exchangerate-api.com/v6/1d789407b20503169daea9f3/latest/USD';

  constructor(private http: HttpClient) {}

  getCurrency(currency: string): Observable<number> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error en la llamada a la API:', error.message);
          return throwError(() => 'Error en la llamada a la API');
        }),
        tap((response) => {
          // Aquí asumimos que el API responde con una estructura que tiene conversion_rates
          this.multiplicationFactor = response.conversion_rates[currency];
          console.log(`La tasa de cambio de USD a ${currency} es: ${this.multiplicationFactor}`);
        }),
        map(() => this.multiplicationFactor),
        shareReplay()
      );
  }
}

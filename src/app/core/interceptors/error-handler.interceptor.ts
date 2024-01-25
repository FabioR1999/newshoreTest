import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Lógica para manejar el error de la respuesta
      console.error('Error en la llamada a API:', error.message);
      return throwError(() => 'Error en la llamada a API');
    })
  )
  
};

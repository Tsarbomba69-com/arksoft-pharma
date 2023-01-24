import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {AuthService} from "@core/services";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err) => {
        if ([401, 403].includes(err.status) && this.authService.currentUser) {
          // auto logout if 401 or 403 response returned from api
          console.error("Não tem autorização para acessar este recurso");
          this.authService.logout();
        }

        let errors: string = '';
        for (const prop in err.error.errors) {
          errors += prop + ': ';
          for (const el in err.error.errors[prop]) {
            errors += `${err.error.errors[prop][el]}\n`;
          }
        }
        const error = errors || err.error?.message || err.statusText;
        console.error(err);
        return throwError(() => error);
      })
    );
  }
}

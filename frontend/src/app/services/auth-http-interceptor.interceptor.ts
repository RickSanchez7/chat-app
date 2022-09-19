import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.access_token;

    const modifiedReq = request.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(modifiedReq).pipe(
      filter((val) => val.type === HttpEventType.Response),
      tap((val: any) => {
        if (val.body.access_token) {
          const token = val.body.access_token;
          const modifiedReq = request.clone({
            withCredentials: true,
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(modifiedReq);
        }
        return next.handle(request);
      })
    );
  }
}

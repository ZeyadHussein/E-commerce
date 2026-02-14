import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private platformId = inject(PLATFORM_ID);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {

      const token = localStorage.getItem("userToken");

      if (token) {
        req = req.clone({
          setHeaders: {
            token: token   
          }
        });
      }
    }

    return next.handle(req);
  }
}

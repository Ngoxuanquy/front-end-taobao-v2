// header-interceptor.service.ts

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Thêm header vào request
    let modifiedRequest = request;

    if (isPlatformBrowser(this.platformId)) {
      const accessToken = sessionStorage.getItem('token')?.replace(/"/g, '');

      // Check if accessToken is available before modifying the request
      modifiedRequest = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          authorization: `${accessToken}`,
          'x-client-id': '67d7c90187b4af33fb32f2d8',
          'x-api-key':
            '87eaea1754825b4a90e5207db1bf1b9675d7144f462addac44de9c62f3093180f6c404f6ce4541f50df7ebe35e8f1d01dde1fa1677b4d496f26803e519294000',
        },
      });
    }

    return next.handle(modifiedRequest);
  }
}

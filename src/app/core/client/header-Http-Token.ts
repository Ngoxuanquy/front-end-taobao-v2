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
          'x-client-id': '657d3e90d1ac32569255dd26',
          'x-api-key':
            'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a',
        },
      });
    }

    // Chuyển tiếp request đã được sửa đổi hoặc request ban đầu nếu không có accessToken
    return next.handle(modifiedRequest);
  }
}

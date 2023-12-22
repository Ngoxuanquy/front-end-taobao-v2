// header-interceptor.service.ts

import { Injectable, Component } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-muonSach',
  templateUrl: './header-Http-Token.component.html',
  styleUrls: ['./header-Http-Token.component.css'],
  standalone: true,
  imports: [HeaderInterceptor],
})
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Thêm header vào request
    const accessToken = this.cookieService.get('token');

    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}`,
        'x-client-id': '657d3e90d1ac32569255dd26',
        'x-api-key':
          'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a',
      },
    });

    // Chuyển tiếp request đã được sửa đổi
    return next.handle(modifiedRequest);
  }
}

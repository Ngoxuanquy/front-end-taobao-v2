import { HttpClientService } from './../../core/services/http-client.serivce';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of, throwError, from, switchMap } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';
import { InitializeAppService } from '../../core/services/app-config.service';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  apiUrl = '';
  newItemEvent: any;

  constructor(
    private cookieService: CookieService,
    private initializeAppService: InitializeAppService,
    private http: HttpClient,
    private HttpClientService: HttpClientService,
    public router: Router // Injecting the Router service
  ) {
    // Check if the application is running in the browser
    this.apiUrl = this.initializeAppService.getApiUrl();
  }

  login(login_value: any): Observable<any> {
    console.log('login', login_value);
    
    if (!login_value?.email || !login_value?.password) {
      alert('Vui lòng nhập đủ thông tin');
      return throwError(() => new Error('Thiếu email hoặc mật khẩu'));
    }
  
    const { email, password } = login_value;
  
    return this.HttpClientService
      .post<any>(`${this.apiUrl}/shop/login`, { email, password })
      .pipe(
        switchMap((response: any) => {
          if (response.metadata?.status === 'Đăng Nhập Thành Công') {
            sessionStorage.setItem('token', JSON.stringify(response.metadata.tokens.accessToken));
            return from(this.router.navigate(['/admin']));
          } else {
            alert('Sai mật khẩu hoặc tài khoản');
            this.newItemEvent.emit(email);
            return throwError(() => new Error('Sai mật khẩu hoặc tài khoản'));
          }
        }),
        catchError((error) => {
          console.error('Login Error:', error);
          return throwError(() => new Error('Đăng nhập thất bại, vui lòng thử lại.'));
        })
      );
  }
  

  logout(): void {
    this.isLoggedIn = false;
    this.cookieService.delete('token');
    localStorage.removeItem('token');
  }

  setIsLogin(state: boolean) {
    this.isLoggedIn = state;
  }
}

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    public router: Router // Injecting the Router service
  ) {
    // Check if the application is running in the browser
    this.apiUrl = this.initializeAppService.getApiUrl();
  }

  login(login_value: any): Observable<any> {
    // Simulate a delay in the login process
    if (login_value.value.email && login_value.value.password) {
      return this.http
        .post<any>(`${this.apiUrl}/shop/login`, {
          email: login_value.value.email,
          password: login_value.value.password,
        })
        .pipe(
          tap((response) => {
            if (response.metadata.status === 'Đăng Nhập Thành Công1') {
              sessionStorage.setItem(
                'token',
                JSON.stringify(response.metadata.tokens.accessToken)
              );

              const redirectUrl = '/admin';

              // Redirect the user
              this.router.navigate([redirectUrl]);
            } else {
              alert('Sai mật khẩu hoặc tài khoản');
              this.newItemEvent.emit(login_value.value.email);
            }
          })
        );
    } else {
      // alert('vui lòng nhập đủ thông tin');
      return of(); // Return an empty observable if no email or password
    }
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

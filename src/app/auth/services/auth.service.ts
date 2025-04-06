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
  isformverify = false;

  constructor(
    private cookieService: CookieService,
    private initializeAppService: InitializeAppService,
    private http: HttpClient,
    private HttpClientService: HttpClientService,
    public router: Router, // Injecting the Router service
  ) {
    // Check if the application is running in the browser
    this.apiUrl = this.initializeAppService.getApiUrl();
  }

  login(login_value: any): Observable<any> {
    if (!login_value?.email || !login_value?.password) {
      alert('Vui lòng nhập đủ thông tin');
      return throwError(() => new Error('Thiếu email hoặc mật khẩu'));
    }

    const { email, password } = login_value;

    return this.HttpClientService.post<any>(`${this.apiUrl}/shop/login`, {
      email,
      password,
    }).pipe(
      switchMap((response: any) => {
        if (response.metadata?.status === 'Đăng Nhập Thành Công') {
          sessionStorage.setItem(
            'token',
            JSON.stringify(response.metadata.tokens.accessToken),
          );
          return from(this.router.navigate(['/admin']));
        } else {
          alert('Sai mật khẩu hoặc tài khoản');
          this.newItemEvent.emit(email);
          return throwError(() => new Error('Sai mật khẩu hoặc tài khoản'));
        }
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(
          () => new Error('Đăng nhập thất bại, vui lòng thử lại.'),
        );
      }),
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

  register(register_value: any): Observable<any> {
    const { email, password, confirmPassword, username } = register_value;

    // Kiểm tra các trường bắt buộc
    if (!email || !password || !confirmPassword || !username) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return throwError(() => new Error('Thiếu thông tin đăng ký'));
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return throwError(() => new Error('Mật khẩu xác nhận không khớp'));
    }

    // Thực hiện gọi API đăng ký
    return this.HttpClientService.post<any>(`${this.apiUrl}/shop/signup`, {
      name: username,
      email,
      password,
    }).pipe(
      switchMap((response: any) => {
        console.log('response', response);

        if (response?.msg === 'Email đã được đăng ký!!') {
          alert('Email đã tồn tại. Vui lòng thử lại với email khác.');
          return throwError(() => new Error('Email đã được đăng ký'));
        }

        if (response?.message === 'Register OK') {
          alert(`${response.metadata.metadata}`);
          this.isformverify = true;
          return of(response); // trả về response sau khi alert
        } else {
          alert(
            'Đăng ký thất bại: ' +
              (response?.metadata?.message || 'Không rõ lý do'),
          );
          return throwError(() => new Error('Đăng ký thất bại'));
        }
      }),
      catchError((error) => {
        console.error('Register Error:', error);
        alert('Đăng ký thất bại, vui lòng thử lại.');
        return throwError(
          () => new Error('Đăng ký thất bại, vui lòng thử lại.'),
        );
      }),
    );
  }

  verifileEmail(value: any) {
    const { email, password, confirmPassword, username, code } = value;

    return this.HttpClientService.post<any>(`${this.apiUrl}/shop/verifile`, {
      name: username,
      email,
      password,
      code,
    }).pipe(
      switchMap((response: any) => {
        console.log('response', response);

        if (response?.msg === 'Email đã được đăng ký!!') {
          alert('Email đã tồn tại. Vui lòng thử lại với email khác.');
          return throwError(() => new Error('Email đã được đăng ký'));
        }

        if (response?.message === 'Success') {
          alert(`Đăng ký thành công`);
          return this.router.navigate(['/']); // trả về response sau khi alert
        } else {
          alert(
            'Đăng ký thất bại: ' +
              (response?.metadata?.message || 'Không rõ lý do'),
          );
          return throwError(() => new Error('Đăng ký thất bại'));
        }
      }),
      catchError((error) => {
        console.error('Register Error:', error);
        alert('Đăng ký thất bại, vui lòng thử lại.');
        return throwError(
          () => new Error('Đăng ký thất bại, vui lòng thử lại.'),
        );
      }),
    );
  }
}

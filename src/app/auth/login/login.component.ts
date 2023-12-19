import { Component, OnInit, EventEmitter, Output, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoaddingComponent } from '../../components/loadding/loadding.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    ReactiveFormsModule,
    HttpClientModule,
    LoaddingComponent,
  ],
})
export class LoginComponent implements OnInit {
  message: string;
  private apiUrl = 'http://localhost:3056/v1/api';
  cookieService = inject(CookieService);
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    private http: HttpClient, // Injecting the HttpClient service
    public authService: AuthService, // Injecting the AuthService service
    public router: Router // Injecting the Router service
  ) {
    this.message = this.getMessage(); // Initializing a property 'message' with the result of the 'getMessage' method
  }

  public login_value: any = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    console.log(this.authService.isLoggedIn);

    if (this.authService.isLoggedIn == true) {
      console.log('abccc');
      this.router.navigate(['/']);

      return true;
    } else {
      // Create a dummy session id
      // Navigate to the login page with extras
      this.router.navigate(['auth/login']);
      console.log('abnvcbc');

      return false;
    }
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  public credentials: any = {
    email: this.login_value.value.email,
    password: this.login_value.value.password,
  };

  private saveTokenToCookie(token: string): void {
    // Adjust the expiration and domain as needed
    document.cookie = `auth_token=${token}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  postLogin(): Observable<any> {
    // Thêm header vào yêu cầu
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Thay thế bằng token của bạn
    });

    return this.http
      .post<any>(
        `${this.apiUrl}/shop/login`,
        {
          email: this.login_value.value.email,
          password: this.login_value.value.password,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          console.log('Login successful:', data);
          // Process or log the data here
        }),
        catchError(this.handleError('login', []))
      );
  }

  // Xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  isLoading: any = false;
  login() {
    if (this.login_value.value.email && this.login_value.value.password) {
      this.isLoading = true;
      console.log(this.credentials);

      this.postLogin().subscribe((response) => {
        console.log(response);

        if (response.metadata.status == 'Đăng Nhập Thành Công1') {
          this.message = 'Trying to log in ...';
          console.log({ response });
          this.authService.login().subscribe(() => {
            this.message = this.getMessage();
            if (this.authService.isLoggedIn) {
              this.cookieService.set(
                'token',
                response.metadata.tokens.accessToken
              );

              this.cookieService.set('name', response.metadata.shop.name);

              this.saveTokenToCookie(response.metadata.tokens.accessToken);

              this.isLoading = false;

              // Usually you would use the redirect URL from the auth service.
              // However to keep the example simple, we will always redirect to `/admin`.
              const redirectUrl = '/';
              console.log(this.authService.isLoggedIn);
              // Set our navigation extras object
              // that passes on our global query params and fragment
              const navigationExtras: NavigationExtras = {
                queryParamsHandling: 'preserve',
                preserveFragment: true,
              };

              // Redirect the user
              this.router.navigate([redirectUrl], navigationExtras);
            }
          });
        } else {
          alert('Sai mật khẩu hoặc tài khoản');
          this.isLoading = false;

          this.message = 'Trying sai ...';
          this.newItemEvent.emit(this.login_value.value.email);
        }
      });
    } else {
      // alert('vui lòng nhập đủ thông tin');
    }
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}

import { Injectable, PLATFORM_ID, Inject, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor(private cookieService: CookieService) {
    // Check if the application is running in the browser
  }

  login(): Observable<boolean> {
    // Simulate a delay in the login process
    return of(true).pipe(
      delay(1000),
      tap(() => {
        this.isLoggedIn = true;
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
    console.log({ state });
    console.log({ isLoggedIn: this.isLoggedIn });
  }
}

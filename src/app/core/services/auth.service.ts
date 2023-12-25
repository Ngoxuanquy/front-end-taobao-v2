import { Injectable, PLATFORM_ID, Inject, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: boolean = false;

  constructor(
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if the application is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Initialize the 'isLoggedIn' property based on the presence of a token in localStorage
      // this.isLoggedIn = localStorage.getItem('token') !== null;
    }
  }

  // Getter for isLoggedIn property

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

  setIsLogin() {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize the 'isLoggedIn' property based on the presence of a token in localStorage
      this.isLoggedIn = localStorage.getItem('token') !== null;
    }
    return this.isLoggedIn;
  }

  checkToken(): any {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize the 'isLoggedIn' property based on the presence of a token in localStorage
      return (this.isLoggedIn = localStorage.getItem('token') !== null);
    }
  }
}

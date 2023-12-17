import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {
    // Check for the presence of a token during service initialization
    this.isLoggedIn = this.cookieService.check('token');
    console.log(this.cookieService.check('token'));
  }

  isLoggedIn;

  // store the URL so we can redirect after logging in

  login(): Observable<boolean> {
    // Simulate login and set the token in the cookie
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
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  isLoggedIn: boolean = this.cookieService.check('token');

  // get isLoggedIn(): any {
  //   return this.cookieService.check('token');
  // }

  login(): Observable<boolean> {
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

  setIsLogin(state: boolean) {
    this.isLoggedIn = state;
  }
}

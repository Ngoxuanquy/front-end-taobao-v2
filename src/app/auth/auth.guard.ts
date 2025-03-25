import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  getItem(key: string): any {
    const storedItem = sessionStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    // Check if sessionStorage is defined
    if (typeof sessionStorage !== 'undefined') {
      // if (!this.authService.isLoggedIn) {
      //   // Use navigateByUrl instead of createUrlTree to navigate to the login page
      //   this.router.navigateByUrl('/auth/login');
      //   return false;
      // }

      return true;
    } else {
      // Handle the case where sessionStorage is not available
      console.error('sessionStorage is not available');
      return false;
    }
  }
}

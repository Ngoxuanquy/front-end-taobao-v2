import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    // Use async/await to handle asynchronous operations

    const isLoggedIn: boolean = await this.authService.isLoggedIn;
    console.log({ isLoggedIn });
    console.log('abcabcbabcbcbcbcbc');

    if (isLoggedIn == true) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);

      return false;
    }
  }
}

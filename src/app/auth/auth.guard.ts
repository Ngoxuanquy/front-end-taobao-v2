import { inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  console.log(authService.isLoggedIn);

  if (authService.isLoggedIn == true) {
    return true;
  } else {
    // Create a dummy session id
    // Navigate to the login page with extras
    router.navigate(['auth/login']);

    return false;
  }
};

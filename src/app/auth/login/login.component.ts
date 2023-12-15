import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, LoginComponent, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  message: string;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
  }

  // Email: any = new FormControl('');
  // Parrword: any = new FormControl('');

  public login_value: any = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    console.log(this.authService.isLoggedIn);
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login() {
    console.log(this.login_value.value.email);

    if (this.login_value.value.email == 'admin') {
      this.message = 'Trying to log in ...';

      this.authService.login().subscribe(() => {
        this.message = this.getMessage();
        if (this.authService.isLoggedIn) {
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
      this.message = 'Trying sai ...';
      this.newItemEvent.emit(this.login_value.value.email);
    }
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}

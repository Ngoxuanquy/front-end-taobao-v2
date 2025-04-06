import { Component, OnInit, EventEmitter, Output, inject } from '@angular/core';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
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
import { AuthService } from '../services/auth.service';
import { InitializeAppService } from '../../core/services/app-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoaddingComponent,
    RouterModule
  ],
})
export class LoginComponent implements OnInit {
  public login_value: any = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  cookieService = inject(CookieService);
  constructor(
    private http: HttpClient, // Injecting the HttpClient service
    public authService: AuthService, // Injecting the AuthService service
    public router: Router // Injecting the Router service
  ) {}

  ngOnInit() {}

  isLoading: any = false;
  login() {
    this.authService.login(this.login_value.value).subscribe(
      (success: any) => {
        // Handle success if needed
      },
      (error: any) => {
        // Handle error if needed
        console.error('Error creating book', error);
      }
    );
  }
}

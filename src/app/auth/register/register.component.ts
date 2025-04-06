import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaddingComponent } from '../../components/loadding/loadding.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { NgOtpInputComponent } from 'ng-otp-input';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LoaddingComponent,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgOtpInputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isLoading = false;
  registerForm: FormGroup;
  otpValue: string = '';
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formData = this.registerForm.value;
      console.log('Registering user:', formData);
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (err) => console.log(err.message),
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  onOtpChange(value: string) {
    this.authService
      .verifileEmail({ ...this.registerForm.value, code: value })
      .subscribe({
        next: () => console.log('Đăng ký thành công'),
        error: (err) => console.log(err.message),
      });
  }
}

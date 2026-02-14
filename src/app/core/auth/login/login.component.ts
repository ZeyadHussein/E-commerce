import { Component, signal, WritableSignal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { signinData } from '../../../shared/models/isignin/isignin';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm!: FormGroup;
  type: WritableSignal<boolean> = signal(false);
  isloading: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal<string>('');
  authsubscribe!: Subscription;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
        ],
      ],
    });
  }

  login() {
    this.authsubscribe?.unsubscribe();
    this.errorMessage.set('');

    if (this.loginForm.valid) {
      this.isloading.set(true);
      const data: Partial<signinData> = this.loginForm.value;

      this.authsubscribe = this.authService.login(data).subscribe({
        next: (res) => {
          this.isloading.set(false);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('userToken', res.token);
          }

          this.authService.isLoggedIn$.next(true);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage.set(err.error?.message || 'Login failed');
          this.isloading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  forgotPassword() {
    const emailValue = this.loginForm.get('email')?.value;
    const emailControl = this.loginForm.get('email');

    if (emailControl?.valid && emailValue) {
      this.isloading.set(true);
      this.errorMessage.set('');

      this.authsubscribe = this.authService.forgotPassword({ email: emailValue }).subscribe({
        next: (res) => {
          this.isloading.set(false);
          alert('Reset code sent to your email!');
        },
        error: (err) => {
          this.isloading.set(false);
          this.errorMessage.set(err.error?.message || 'Email not found or server error');
        },
      });
    } else {
      emailControl?.markAsTouched();
      this.errorMessage.set('Please enter a valid email first to reset your password.');
    }
  }

  ngOnDestroy(): void {
    this.authsubscribe?.unsubscribe();
  }
}
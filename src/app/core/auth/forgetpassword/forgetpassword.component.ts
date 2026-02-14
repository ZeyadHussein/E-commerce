import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  forgetForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  sendResetCode() {

    if (this.forgetForm.invalid) {
      this.forgetForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const emailValue = this.forgetForm.value.email;

    this.authService.forgotPassword({ email: emailValue }).subscribe({


      next: (res) => {
        this.isLoading.set(false);

        this.successMessage.set(
          'Reset code sent successfully! Check your email 📩'
        );

    
        setTimeout(() => {
          this.router.navigate(['/verifycode']);
        }, 1500);
      },

      error: (err) => {
        this.isLoading.set(false);

        this.errorMessage.set(
          err.error?.message || 'Something went wrong!'
        );
      }

    });
  }

}
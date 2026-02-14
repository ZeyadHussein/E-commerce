import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifycode',
  imports: [ReactiveFormsModule],
  templateUrl: './verifycode.component.html',
  styleUrl: './verifycode.component.css',
})
export class VerifycodeComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  verifyForm: FormGroup = this.fb.group({
    resetCode: ['', [Validators.required, Validators.minLength(6)]],
  });

  verifyCode() {

    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.verifyResetCode(this.verifyForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set("Code Verified Successfully ✅");
        setTimeout(() => {
          this.router.navigate(['/resetpassword']);

        }, 1500);
      },

      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || "Invalid Code ❌");
      },
    });
  }
}
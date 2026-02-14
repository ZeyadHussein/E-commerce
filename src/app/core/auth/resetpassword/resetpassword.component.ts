import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent {


  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  type: WritableSignal<boolean> = signal(false);


  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  resetForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
      ],
    ],
  });

  togglePassword() {
    this.type.set(!this.type());
  }
  resetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.resetPassword(this.resetForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);

        this.successMessage.set("Password Reset Successfully ✅");
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || "Reset Failed ❌");
      },
    });
  }
}

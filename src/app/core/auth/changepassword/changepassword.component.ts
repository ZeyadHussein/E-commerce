import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
})
export class ChangepasswordComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  oldType: WritableSignal<boolean> = signal(false);
  newType: WritableSignal<boolean> = signal(false);
  confirmType: WritableSignal<boolean> = signal(false);

  changeForm: FormGroup = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
  });


  changePassword() {
    if (this.changeForm.invalid) {
      this.changeForm.markAllAsTouched();
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = this.changeForm.value;
    if (newPassword !== confirmPassword) {
      this.errorMessage.set('Passwords do not match ❌');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService
      .changePassword({
        currentPassword: oldPassword,
        password: newPassword,
        rePassword: confirmPassword,
      })
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.successMessage.set(res.message || 'Password changed successfully ✅');

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.message || 'Something went wrong ❌');
        },
      });
  }

}

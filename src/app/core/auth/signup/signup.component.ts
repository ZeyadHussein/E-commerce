import { AuthService } from './../../services/auth/auth.service';
import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SignupData } from '../../../shared/models/signup/isignup';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {

  signupform!: FormGroup;

  type: WritableSignal<boolean> = signal<boolean>(false);
  isloading: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: WritableSignal<string> = signal<string>('');
  authsubscribe!: Subscription;

  constructor(
    private fb: FormBuilder,
    public readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const repassword = group.get('rePassword')?.value;

    return password === repassword ? null : { mismatch: true };
  }

  initForm() {
    this.signupform = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)],],

        email: ['', [Validators.required, Validators.email]],

        password: [
          '',
          [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
          ],
        ],

        rePassword: ['', [Validators.required]],

        phone: [
          '',
          [
            Validators.required,
            Validators.pattern('^01[012][0-9]{8}$'),
          ],
        ],
      },
      {
        validators: this.confirmPassword.bind(this),
      }
    );
  }

  signup() {
    this.authsubscribe?.unsubscribe();
    this.errorMessage.set('');

    if (this.signupform.valid) {
      this.isloading.set(true);

      const data: Partial<SignupData> = this.signupform.value;

      this.authsubscribe = this.authService.signup(data).subscribe({
        next: (res) => {
          this.isloading.set(false);
          localStorage.setItem('userToken',res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
        
          this.errorMessage.set(err.error.message);
          this.isloading.set(false);
        },
      });
    } else {
      this.signupform.markAllAsTouched();
    }
  }
}

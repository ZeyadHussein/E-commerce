import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Isignup, SignupData } from '../../../shared/models/signup/isignup';
import { signinData } from '../../../shared/models/isignin/isignin';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { IverifyCode } from '../../../shared/models/iverifyCode/iverify-code.interface';
import { Iresetpassword } from '../../../shared/models/iresetpassword/iresetpassword.interface';
import { Forgetpassowrd } from '../../../shared/models/iforgetpassword/forgetpassowrd.=interface';
import { Changepassowrd } from '../../../shared/models/ichangepassword/changepassowrd.=interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private platformId = inject(PLATFORM_ID);

  constructor(private readonly http: HttpClient) { }

  signup(data: Partial<SignupData>): Observable<Isignup> {
    return this.http.post<Isignup>(`${this.apiUrl}/auth/signup`, data);
  }

  login(data: Partial<signinData>): Observable<Isignup> {
    return this.http.post<Isignup>(`${this.apiUrl}/auth/signin`, data);
  }

  forgotPassword(data: { email: string }): Observable<Forgetpassowrd> {
    return this.http.post<Forgetpassowrd>(`${this.apiUrl}/auth/forgotPasswords`, data);
  }
  verifyResetCode(data: { resetCode: string }): Observable<IverifyCode> {
    return this.http.post<IverifyCode>(`${this.apiUrl}/auth/verifyResetCode`, data);
  }

  resetPassword(data: { email: string; newPassword: string; }): Observable<Iresetpassword> {
    return this.http.put<Iresetpassword>(`${this.apiUrl}/auth/resetPassword`, data);
  }


  changePassword(data: {
    currentPassword: string;
    password: string;
    rePassword: string;
  }): Observable<Changepassowrd> {
    return this.http.put<Changepassowrd>(`${this.apiUrl}/users/changeMyPassword`, data);
  }

  isLogin() {
    try {
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('userToken');
        if (token) {
          this.isLoggedIn$.next(true);
          return;
        }
      }
    } catch (error) {
      this.isLoggedIn$.next(false);
    }
    this.isLoggedIn$.next(false);
  }
}
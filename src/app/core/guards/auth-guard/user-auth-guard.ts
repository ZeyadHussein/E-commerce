import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const userAuthGuard: CanActivateFn = () => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {

    const token = localStorage.getItem('userToken');

    // ✅ If token exists and valid → go home
    if (token) {
      try {
        jwtDecode(token);

        router.navigate(['/home']);
        return false;

      } catch {
        // Token invalid → allow login page
        return true;
      }
    }

    // No token → allow login page
    return true;
  }

  return true;
};

import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {

    const token = localStorage.getItem('userToken');

    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    try {
      jwtDecode(token);
      return true;
    } catch {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authservice.isLoggedIn();

  if(!isLoggedIn){
    router.navigate(['/login']);
    return false;
  }

  return true;
};

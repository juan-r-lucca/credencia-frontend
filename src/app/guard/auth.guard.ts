import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return authService.checkSession().pipe(
    take(1),
    map(isValid => {
      if (isValid) return true;
      
      return router.createUrlTree(['/login']);
    })
  );
};
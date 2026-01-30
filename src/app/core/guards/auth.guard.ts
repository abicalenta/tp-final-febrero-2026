import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const onlyLoggedUserGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const isLogged = localStorage.getItem('user'); 

  if (isLogged) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
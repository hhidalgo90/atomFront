import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const tasksGuard: CanActivateFn = (route, state) => {
  console.log("tasksGuard activated");
  
  const router = inject(Router);
  const email = sessionStorage.getItem('email');
  if (!email || email.length === 0) {
    // Si no está autenticado, redirige a la página de login
    return router.parseUrl('/login');
  }
  return true;
};

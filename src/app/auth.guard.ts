import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './Services/User/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (
    userService.currentUserSignal()?.email ||
    userService.currentUserSignal()?.username
  ) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const loggedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.currentUserSignal() !== null) {
    router.navigate(['/404']);
    return false;
  } else {
    return true;
  }
};

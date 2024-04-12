import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './Services/User/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.currentUserSignal() !== null) {
    return true;
  } else {
    router.navigateByUrl('/404');
    return false;
  }
};

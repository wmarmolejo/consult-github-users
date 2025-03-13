import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserApiService } from '../service/user-api.service';
import { Observable, map } from 'rxjs';

export const userScoreGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserApiService);
  const router = inject(Router);
  
  const username = route.paramMap.get('username');
  
  if (!username) {
    router.navigate(['/']);
    return false;
  }

  return userService.getUserDetails(username).pipe(
    map(user => {
      console.log(user);
      if (user && user.followers >= 30.0) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
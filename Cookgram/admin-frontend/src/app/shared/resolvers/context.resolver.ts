import { inject } from '@angular/core';
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserApiSerivce } from '../../../api/user.api';
import { tap } from 'rxjs';
export const ContextResolver: ResolveFn<any> = (
  _: ActivatedRouteSnapshot,
  __: RouterStateSnapshot
) => inject(UserApiSerivce).currentUserInfo().pipe(tap(console.log));

import { inject } from '@angular/core';
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserApiSerivce } from '../../../api/user.api';
import { tap } from 'rxjs';
import { MainStore } from '../../../store/main.store';
import { Store } from '@ngrx/store';
import { SetCurrentUserAction } from '../../../store/currentUser/actions';
export const ContextResolver: ResolveFn<any> = (
  _: ActivatedRouteSnapshot,
  __: RouterStateSnapshot
) => {
  const mainStore = inject(Store<MainStore>);
  return inject(UserApiSerivce)
    .currentUserInfo()
    .pipe(
      tap((currentUser) => {
        console.log(currentUser)
        mainStore.dispatch(SetCurrentUserAction(currentUser));
      })
    );
};

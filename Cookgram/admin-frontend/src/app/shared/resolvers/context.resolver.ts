import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { UserApiSerivce } from '../../../api/user.api';
import { SetCurrentUserAction } from '../../../store/currentUser/actions';
import { MainStore } from '../../../store/main.store';

export const ContextResolver: ResolveFn<unknown> = (
  _: ActivatedRouteSnapshot,
  __: RouterStateSnapshot
) => {
  const mainStore: Store<MainStore> = inject(Store<MainStore>);

  return inject(UserApiSerivce)
    .currentUserInfo()
    .pipe(
      tap((currentUser) => {
        mainStore.dispatch(SetCurrentUserAction(currentUser));
      })
    );
};

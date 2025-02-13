import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from '../app/pages/users/users-list/types';
import { ContextUser } from '../app/shared/types/shared';
import { BaseApi } from './base.api';
import { CreateUserObject } from './types/user.types';
import { UserLinks } from './consts/user.consts';

@Injectable()
export class UserApiSerivce extends BaseApi {
  constructor() {
    super();
  }

  userLists(): Observable<Readonly<UserList>[]> {
    return this.httpService.post<UserList[]>(
      this.prepareLink(UserLinks.List),
      {}
    );
  }

  currentUserInfo(): Observable<Readonly<ContextUser>> {
    return this.httpService.get<ContextUser>(
      this.prepareLink(UserLinks.Current)
    );
  }

  createUser(user: CreateUserObject): Observable<unknown> {
    return this.httpService.post<unknown>(
      this.prepareLink(UserLinks.Create),
      user
    );
  }
}

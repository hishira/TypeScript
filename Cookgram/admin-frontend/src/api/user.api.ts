import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserObject } from './types/user.types';
import { UserList } from '../app/pages/users/users-list/types';
import { ContextUser } from '../app/shared/types/shared';

@Injectable()
export class UserApiSerivce extends BaseApi {
  constructor() {
    super();
  }

  userLists(): Observable<Readonly<UserList>[]> {
    return this.httpService.post<UserList[]>(
      this.prepareLink('user/user-list'),
      {}
    );
  }

  currentUserInfo(): Observable<Readonly<ContextUser>> {
    return this.httpService.get<ContextUser>(this.prepareLink('user/current-user'));
  }

  createUser(user: CreateUserObject): Observable<unknown> {
    return this.httpService.post<unknown>(this.prepareLink("user/add-user"), user);
  }
}

import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base.api';
import { Injectable } from '@angular/core';
import { UserList } from '../app/pages/users/users-list/users-list.component';
import { Observable } from 'rxjs';
import { CreateUserObject } from './types/user.types';
@Injectable()
export class UserApiSerivce extends BaseApi {
  constructor(private readonly httpService: HttpClient) {
    super();
  }
  
  userLists(): Observable<UserList[]> {
    return this.httpService.post<UserList[]>(
      this.prepareLink('user/user-list'),
      {}
    );
  }

  createUser(user:CreateUserObject) {
    
  }
}

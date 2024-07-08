import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base.api';
import { Injectable } from '@angular/core';
@Injectable()
export class UserApiSerivce extends BaseApi {
  constructor(private readonly httpService: HttpClient) {
    super();
  }

  userLists() {
    return this.httpService.post(this.prepareLink('user/user-list'), {});
  }
}

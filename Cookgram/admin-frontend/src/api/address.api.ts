import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from './base.api';
import { AddressControl } from '../app/pages/users/modals/create-user-modal/create-user-model.types';
import { AddressLinks } from './consts/address.consts';

@Injectable()
export class AddressApiService extends BaseApi {

  createAddress(address: AddressControl): Observable<void> {
    return this.httpService.post<void>(
      this.prepareLink(AddressLinks.Create),
      address
    );
  }

  updateAddress(context_id: string, address: AddressControl): Observable<void> {
    return this.httpService.put<void>(
      this.prepareLink(`${AddressLinks.Update}/${context_id}`),
      address
    );
  }
}
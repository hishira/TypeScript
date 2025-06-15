import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { AddressApiService } from '../../../../../../api/address.api';
import { ReadoOnlyComponent } from '../../../../../shared/components/readonly-only/readonly-only.component';
import { AddressChangeModalComponent } from '../../../modals/address-change-modal/address-change-modal.component';
import { AddressControl } from '../../../modals/create-user-modal/create-user-model.types';
import { UserAddress } from '../../types';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  standalone: true,
  imports: [CommonModule, ReadoOnlyComponent, SkeletonModule, ButtonModule],
  providers: [DialogService, AddressApiService],
})
export class UserAddressComponent {
  readonly address = input<UserAddress | null | undefined>();
  readonly loading = input<boolean>(false);
  readonly isLocationAvailable = computed(
    () =>
      this.address()?.location?.latitude !== null &&
      this.address()?.location?.longitude !== null
  );
  readonly locationComputedString = computed(
    () =>
      `Lat: ${this.address()?.location?.latitude}, Lng: ${
        this.address()?.location?.longitude
      }`
  );

  private readonly dialogService = inject(DialogService);
  private readonly addressApi = inject(AddressApiService);

  addressChange(): void {
    const ref = this.dialogService.open(AddressChangeModalComponent, {
      header: 'Change address',
      width: '65%',
      modal: true,
      styleClass: 'customModal',
      data: {
        address: this.address(),
      },
    });

    ref.onClose.subscribe((address: AddressControl | undefined) => {
      if (address) {
        // Handle the updated address here
        console.log('Address updated:', address);
      }
    });
  }
}

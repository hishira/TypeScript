import { CommonModule } from '@angular/common';
import { Component, input, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ReadoOnlyComponent } from '../../../../../shared/components/readonly-only/readonly-only.component';
import { UserAddress } from '../../types';
import { DialogService } from 'primeng/dynamicdialog';
import { AddressChangeModalComponent } from '../../../modals/address-change-modal/address-change-modal.component';
import { AddressControl } from '../../../modals/create-user-modal/create-user-model.types';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  standalone: true,
  imports: [CommonModule, ReadoOnlyComponent, SkeletonModule, ButtonModule],
  providers: [DialogService],
})
export class UserAddressComponent {
  readonly address = input<UserAddress | null | undefined>();
  readonly loading = input<boolean>(false);
  private readonly dialogService = inject(DialogService);
  addressChange() {
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

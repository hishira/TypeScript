import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddressComponent } from '../../../../shared/components/address/address.component';
import { EMPTY_ADDRESS_REQUIRED_MAP } from '../../../../shared/components/address/address.utils';
import { AddressRequiredMap } from '../../../../shared/components/address/types';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { AbstractModalComponent } from '../../../../shared/directives/abstract-modal.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { AddressControl } from '../create-user-modal/create-user-model.types';

@Component({
  selector: 'app-address-change-modal',
  templateUrl: './address-change-modal.component.html',
  standalone: true,
  providers: [ModalService],
  imports: [
    DialogComponent,
    ButtonModule,
    ReactiveFormsModule,
    AddressComponent,
  ],
})
export class AddressChangeModalComponent extends AbstractModalComponent {
  readonly addressControl = new FormControl<AddressControl | null>(null);
  readonly addressMap: AddressRequiredMap = {
    ...EMPTY_ADDRESS_REQUIRED_MAP,
    Address: true,
    House: true,
    PostalCode: true,
    City: true,
    Country: true,
  };

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly config: DynamicDialogConfig
  ) {
    super(1); // Only one step
    const initialAddress = this.config.data?.address as AddressControl;
    if (initialAddress) {
      this.addressControl.setValue(initialAddress);
    }
  }

  save(): void {
    if (!this.addressControl.valid) {
      this.addressControl.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.addressControl.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

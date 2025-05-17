import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ReadoOnlyComponent } from '../../../../../shared/components/readonly-only/readonly-only.component';
import { UserAddress } from '../../types';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  standalone: true,
  imports: [CommonModule, ReadoOnlyComponent, SkeletonModule, ButtonModule],
})
export class UserAddressComponent {
  readonly address = input<UserAddress | null | undefined>();
  readonly loading = input<boolean>(false);
}

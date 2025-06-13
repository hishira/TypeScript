import { CommonModule } from '@angular/common';
import { Component, computed, input, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { ReadoOnlyComponent } from '../../../../../shared/components/readonly-only/readonly-only.component';
import { UserDetails } from '../../types';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReadoOnlyComponent,
    ChipModule,
    SkeletonModule,
    ButtonModule,
  ],
})
export class UserInfoComponent {
  readonly user = input.required<UserDetails | null | undefined>();
  readonly loading = input<boolean>(false);
  readonly personalInformarion = computed(
    () => this.user()?.personalInformation
  );
  readonly fullName: Signal<string> = computed(
    () =>
      this.personalInformarion()?.firstName +
      ' ' +
      this.personalInformarion()?.lastName
  );
}

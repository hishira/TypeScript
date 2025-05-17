import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
    import { ButtonModule } from 'primeng/button';
import { ReadoOnlyComponent } from '../../../../../shared/components/readonly-only/readonly-only.component';
import { UserDetails } from '../../types';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  standalone: true,
  imports: [CommonModule, ReadoOnlyComponent, ChipModule, SkeletonModule, ButtonModule]
})
export class UserInfoComponent {
  readonly user = input<UserDetails | null | undefined>();
  readonly loading = input<boolean>(false);
}

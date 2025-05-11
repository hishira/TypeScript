import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { UserApiSerivce } from '../../../../api/user.api';
import { BaseComponent } from '../../../shared/components/base-component/base-component';
import { UserDetails } from './types';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [
    CommonModule,
    PanelModule,
    ButtonModule,
    ProgressSpinnerModule,
    ChipModule,
    SkeletonModule,
  ],
  standalone: true,
  providers: [UserApiSerivce],
})
export class UserDetailsComponent extends BaseComponent {
  user!: Signal<UserDetails | null>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserApiSerivce
  ) {
    super();
  }

  override initialize(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.user = toSignal(this.userService.userDetails(userId!), {
      initialValue: null,
    });
  }
}

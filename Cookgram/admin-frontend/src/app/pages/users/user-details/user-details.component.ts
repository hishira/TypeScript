import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { UserApiSerivce } from '../../../../api/user.api';
import { BaseComponent } from '../../../shared/components/base-component/base-component';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserDetails } from './types';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    ButtonModule,
    ProgressSpinnerModule,
    ChipModule,
    SkeletonModule,
    UserAddressComponent,
    UserInfoComponent,
  ],
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

import {
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { UserApiSerivce } from '../../../../api/user.api';
import { BaseComponent } from '../../../shared/components/base-component/base-component';
import { EmptyListComponent } from '../../../shared/empty/empty-list/empty-list.component';
import { CreateUserModalComponent } from '../modals/create-user-modal/create-user-modal.component';
import { UserList } from './types';
import { CommonModule } from '@angular/common';
import { ReadoOnlyComponent } from '../../../shared/components/readonly-only/readonly-only.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TableSkeletonComponent } from '../../../shared/components/skeletons/table-skeleton/table-skeleton.component';
import { skeletonRows } from './consts';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-users-list',
  standalone: true,
  providers: [UserApiSerivce, DialogService],
  imports: [
    TableModule,
    PrimeTemplate,
    InputTextModule,
    CardModule,
    EmptyListComponent,
    PanelModule,
    ButtonModule,
    CommonModule,
    ReadoOnlyComponent,
    SkeletonModule,
    TableSkeletonComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent extends BaseComponent {
  users: WritableSignal<UserList[]> = signal([]);
  readonly userExists: Signal<boolean> = computed(
    () => this.users()?.length > 0
  );
  readonly refetch: WritableSignal<boolean> = signal(false);
  readonly skeletonRows = skeletonRows;

  constructor(
    private readonly userApi: UserApiSerivce,
    private readonly dialogService: DialogService,
    private readonly route: Router,
    private readonly activeRoute: ActivatedRoute
  ) {
    super();
    this.users = signal(
      toSignal(this.userApi.userLists(), { initialValue: [] })()
    );
    effect(
      () => {
        this.refetch();
        firstValueFrom(this.userApi.userLists()).then((response) =>
          this.users.set(response)
        );
      },
      { allowSignalWrites: true }
    );
  }

  createUser(): void {
    const ref = this.dialogService.open(CreateUserModalComponent, {
      header: 'Create user',
      width: '100%',
      modal: true,
      height: '100%',
      styleClass: 'customModal',
    });
    firstValueFrom(ref.onClose).then(
      (response) => response && this.refetch.update((r) => !r)
    );
  }

  onRowSelect(customer: UserList): void {
    this.route.navigate(['../user', customer.id, 'details'], {
      relativeTo: this.activeRoute,
    });
  }
}

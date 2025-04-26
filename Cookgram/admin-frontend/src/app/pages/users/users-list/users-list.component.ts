import { Component, Signal } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { delay, Observable } from 'rxjs';
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
  users!: Signal<UserList[]>;
  readonly skeletonRows = skeletonRows;

  constructor(
    private readonly userApi: UserApiSerivce,
    private readonly dialogService: DialogService,
    private readonly route: Router,
    private readonly activeRoute: ActivatedRoute
  ) {
    super();
    this.users = toSignal(this.userApi.userLists(), { initialValue: [] });
    this.route.events.subscribe((event) => {
      console.log(event);
    });
  }

  createUser() {
    this.dialogService.open(CreateUserModalComponent, {
      header: 'Create user',
      width: '100%',
      modal: true,
      height: '100%',
      styleClass: 'customModal',
    });
  }

  onRowSelect(customer: UserList): void {
    console.log('Selected customer:', customer);
    this.route.navigate(['../user',customer.id, 'details'], {
      relativeTo: this.activeRoute,
    });
  }
}

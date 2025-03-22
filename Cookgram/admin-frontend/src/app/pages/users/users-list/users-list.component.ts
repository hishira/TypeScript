import { Component } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { UserApiSerivce } from '../../../../api/user.api';
import { BaseComponent } from '../../../shared/components/base-component/base-component';
import { EmptyListComponent } from '../../../shared/empty/empty-list/empty-list.component';
import { CreateUserModalComponent } from '../modals/create-user-modal/create-user-modal.component';
import { UserList } from './types';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent extends BaseComponent {
  users$!: Observable<UserList[]>;

  constructor(
    private readonly userApi: UserApiSerivce,
    private readonly dialogService: DialogService
  ) {
    super();
  }

  override initialize(): void {
    this.users$ = this.userApi.userLists();
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
}

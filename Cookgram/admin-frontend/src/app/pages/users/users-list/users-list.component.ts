import { Component, OnInit } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { UserApiSerivce } from '../../../../api/user.api';
import { EmptyListComponent } from '../../../shared/empty/empty-list/empty-list.component';
import { CreateUserModalComponent } from '../modals/create-user-modal/create-user-modal.component';
import { UserList } from './types';
//TODO: Fix after fixing backend

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
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  readonly users: UserList[] = [];

  constructor(
    private readonly userApi: UserApiSerivce,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.userApi
      .userLists()
      .subscribe((users: UserList[]) => this.users.push(...users));
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

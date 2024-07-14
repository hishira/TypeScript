import { Component, OnInit } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { UserApiSerivce } from '../../../../api/user.api';
import { EmptyListComponent } from '../../../shared/empty/empty-list/empty-list.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUserModalComponent } from '../modals/create-user-modal/create-user-modal.component';

//TODO: Fix after fixing backend
type UserAddressList = {
  address: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
};
export type UserList = {
  username: string;
  last_name: string | null;
  id: string;
  first_name: string | null;
  email: string;
  contract_id: string | null;
  address: UserAddressList;
};
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
  users: UserList[] = [];
  constructor(
    private readonly userApi: UserApiSerivce,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.userApi
      .userLists()
      .subscribe((users: UserList[]) => (this.users = users));
  }
  createUser() {
    this.dialogService.open(CreateUserModalComponent, {
      header: 'Create user',
      width: '100%',
      height: '100%',
      maximizable: true,
      
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { UserApiSerivce } from '../../../../api/user.api';
import { EmptyListComponent } from '../../../shared/empty/empty-list/empty-list.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

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
  providers: [UserApiSerivce],
  imports: [
    TableModule,
    PrimeTemplate,
    InputTextModule,
    CardModule,
    EmptyListComponent,
    PanelModule,
    ButtonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users: UserList[] = [];
  constructor(private readonly userApi: UserApiSerivce) {}
  ngOnInit(): void {
    this.userApi
      .userLists()
      .subscribe((users: UserList[]) => (this.users = users));
  }
}

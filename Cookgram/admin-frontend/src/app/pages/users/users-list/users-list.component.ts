import { Component, OnInit } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { UserApiSerivce } from '../../../../api/user.api';

@Component({
  selector: 'app-users-list',
  standalone: true,
  providers: [UserApiSerivce],
  imports: [TableModule, PrimeTemplate, InputTextModule, CardModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users = [
    {
      name: 'Jony doea',
      country: 'Poland',
      status: 'Active',
    },
    {
      name: 'Jony doea',
      country: 'Poland',
      status: 'Active',
    },
    {
      name: 'Jony doea',
      country: 'Poland',
      status: 'Active',
    },
  ];
  constructor(private readonly userApi: UserApiSerivce) {}
  ngOnInit(): void {
    this.userApi.userLists().subscribe((users) => console.log(users));
  }
}

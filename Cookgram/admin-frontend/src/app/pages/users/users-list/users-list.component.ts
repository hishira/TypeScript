import { Component } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [TableModule, PrimeTemplate, InputTextModule, CardModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
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
}
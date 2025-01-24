import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UsersListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './usersr.routing.module';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, UsersComponent],
})
export class UsersModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './usersr.routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, UsersComponent],
})
export class UsersModule {}

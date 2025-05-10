import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './usersr.routing.module';
import { PanelModule } from 'primeng/panel';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, UsersComponent, PanelModule],
})
export class UsersModule {}

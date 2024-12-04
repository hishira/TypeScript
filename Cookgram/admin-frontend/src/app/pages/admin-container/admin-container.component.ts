import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AdminMenubarComponent } from './admin-menubar/admin-menubar.component';
import { RippleModule } from 'primeng/ripple';
import { MenuItems } from './admin-container.consts';

@Component({
  selector: 'app-admin-container',
  standalone: true,
  imports: [RouterOutlet, PanelMenuModule, AdminMenubarComponent, RippleModule],
  templateUrl: './admin-container.component.html',
  styleUrl: './admin-container.component.scss',
})
export class AdminContainerComponent {
  readonly menuItems: MenuItem[] = MenuItems;
}

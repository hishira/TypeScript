import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AdminMenubarComponent } from './admin-menubar/admin-menubar.component';

@Component({
  selector: 'app-admin-container',
  standalone: true,
  imports: [RouterOutlet, PanelMenuModule, AdminMenubarComponent],
  templateUrl: './admin-container.component.html',
  styleUrl: './admin-container.component.scss',
})
export class AdminContainerComponent implements OnInit {
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Users',
        icon: 'pi pi-user',
        items: [
          {
            label: 'List',
          },
        ],
      },
    ];
  }
}

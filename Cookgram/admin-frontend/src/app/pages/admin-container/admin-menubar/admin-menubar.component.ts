import { Component } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-admin-menubar',
  standalone: true,
  imports: [MenubarModule, AvatarModule, InputTextModule, PrimeTemplate],
  templateUrl: './admin-menubar.component.html',
  styleUrl: './admin-menubar.component.scss',
})
export class AdminMenubarComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-container',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-container.component.html',
  styleUrl: './admin-container.component.scss',
})
export class AdminContainerComponent {}

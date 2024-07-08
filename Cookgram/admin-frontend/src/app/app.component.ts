import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SessionStorageService } from './shared/services/sessionStorage.service';
import { Store } from '@ngrx/store';
import { MainStore } from '../store/main.store';
import { JWTSetAction } from '../store/jwt/action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private readonly sessionStorage: SessionStorageService,
    private readonly store: Store<MainStore>
  ) {
    try {
      if (this.sessionStorage.getItem('token')) {
        this.store.dispatch(
          JWTSetAction({ ...this.sessionStorage.getItem('token') })
        );
      }
    } catch (_) {}
  }
}

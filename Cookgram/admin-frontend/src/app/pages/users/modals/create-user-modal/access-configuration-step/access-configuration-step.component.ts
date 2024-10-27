import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { MainStore } from '../../../../../../store/main.store';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { InputComponent } from '../../../../../shared/input/input.component';
import { AccessConfigurationStepGroup } from '../create-user-model.types';
import { CurrentUserSelector } from '../../../../../../store/currentUser/selectors';
import { Observable, map } from 'rxjs';
import { Role } from '../../../../../shared/types/enums';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-access-configuration-step',
  templateUrl: './access-configuration-step.component.html',
  standalone: true,
  imports: [
    DialogComponent,
    InputComponent,
    ReactiveFormsModule,
    InputSwitchModule,
    TooltipModule,
    ButtonModule,
    DropdownModule,
    AsyncPipe
  ],
  styleUrl: './access-configuration.scss',
})
export class AccessConfigurationStep extends AbstractStepDirective<AccessConfigurationStepGroup> {
  readonly roles: Observable<string[]> = this.prepareRoles();

  constructor(private readonly store: Store<MainStore>) {
    super();
  }

  private prepareRoles(): Observable<string[]> {
    return this.store.select(CurrentUserSelector).pipe(
      map((currentUser) => {
        console.log(currentUser)
        if (currentUser.roles === Role.SuperAdmin) {
          return [
            'User',
            'Employee',
            'Manager',
            'Director',
            'Admin',
            'SuperAdmin',
          ];
        }
        return [];
      })
    );
  }
}

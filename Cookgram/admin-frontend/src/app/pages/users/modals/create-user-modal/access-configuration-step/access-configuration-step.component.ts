import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { Observable, map } from 'rxjs';
import { CurrentUserSelector } from '../../../../../../store/currentUser/selectors';
import { MainStore } from '../../../../../../store/main.store';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { AbstractStepComponent } from '../../../../../shared/directives/abstract-step.component';
import { InputComponent } from '../../../../../shared/input/input.component';
import { Role } from '../../../../../shared/types/enums';
import { AccessConfigurationStepGroup } from '../create-user-model.types';
import { PrepareRoles } from './access-configuration-step.utils';
import { ErrorsComponent } from '../../../../../shared/errors/errors.component';

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
    AsyncPipe,
    ErrorsComponent,
  ],
  styleUrl: './access-configuration.scss',
})
export class AccessConfigurationStep extends AbstractStepComponent<AccessConfigurationStepGroup> {
  roles: Observable<Role[]> = this.prepareProperRoles();

  constructor(private readonly store: Store<MainStore>) {
    super();
  }

  private prepareProperRoles(): Observable<Role[]> {
    return this.store
      .select(CurrentUserSelector)
      .pipe(map((currentUser) => PrepareRoles(currentUser.roles)));
  }
}

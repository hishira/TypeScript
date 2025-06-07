import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { ErrorsComponent } from '../../../../../shared/errors/errors.component';
import { InputComponent } from '../../../../../shared/input/input.component';
import { Role } from '../../../../../shared/types/enums';
import { AccessConfigurationStepGroup } from '../create-user-model.types';
import { PrepareRoles } from './access-configuration-step.utils';

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
    ErrorsComponent,
  ],
  styleUrl: './access-configuration.scss',
})
export class AccessConfigurationStep extends AbstractStepComponent<AccessConfigurationStepGroup> {
  readonly roles: Signal<Role[]> = toSignal(this.prepareProperRoles(), {
    initialValue: [],
  });

  constructor(private readonly store: Store<MainStore>) {
    super();
  }

  private prepareProperRoles(): Observable<Role[]> {
    return this.store
      .select(CurrentUserSelector)
      .pipe(map((currentUser) => PrepareRoles(currentUser.roles)));
  }
}

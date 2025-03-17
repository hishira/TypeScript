import { AbstractControl, ControlEvent } from '@angular/forms';
import { EventHandlerFunction } from '../types';

export const DefaultChangeHandler: EventHandlerFunction<ControlEvent> = (
  event: ControlEvent,
  control: AbstractControl
) => null;

import { AbstractControl, ControlEvent } from '@angular/forms';
import { EventHandlerFunction } from '../input.utils';

export const DefaultChangeHandler: EventHandlerFunction<ControlEvent> = (
  event: ControlEvent,
  control: AbstractControl
) => null;

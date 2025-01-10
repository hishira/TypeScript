import {
  AbstractControl,
  ControlEvent,
  TouchedChangeEvent,
} from '@angular/forms';
import { EventHandlerFunction } from '../input.utils';

export const TouchChangeEventControl: EventHandlerFunction<
  TouchedChangeEvent
> = (event: TouchedChangeEvent, control: AbstractControl) => {
  event.touched && control.markAsTouched();
};

export const IsTouchEvent = (
  event: ControlEvent
): event is TouchedChangeEvent => {
  return event instanceof TouchedChangeEvent;
};

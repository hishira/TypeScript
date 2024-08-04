import { EventHandlerFunction } from '../input.utils';
import {
  TouchedChangeEvent,
  AbstractControl,
  ControlEvent,
} from '@angular/forms';

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

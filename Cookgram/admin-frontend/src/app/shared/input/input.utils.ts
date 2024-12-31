import { AbstractControl, ControlEvent } from '@angular/forms';
import { DefaultChangeHandler } from './events-handlers/default-event.handler';
import {
  IsTouchEvent,
  TouchChangeEventControl,
} from './events-handlers/touch-events.handler';

export type EventHandlerFunction<T extends ControlEvent> = (
  event: T,
  control: AbstractControl
) => void;

export enum InputTypes {
  Text = 'text',
  Password = 'password'
};

export type InputStringTypes = 'text' | 'password';

const GetEventHandler: <T extends ControlEvent>(
  event: T
) => EventHandlerFunction<T> = <T extends ControlEvent>(
  event: T
): EventHandlerFunction<T> =>
  IsTouchEvent(event)
    ? (TouchChangeEventControl as EventHandlerFunction<ControlEvent>)
    : DefaultChangeHandler;

export const EventHandler = (
  event: ControlEvent<unknown>,
  control: AbstractControl
): void => GetEventHandler(event)(event, control);

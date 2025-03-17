import { AbstractControl, ControlEvent } from '@angular/forms';

export type EventHandlerFunction<T extends ControlEvent> = (
  event: T,
  control: AbstractControl
) => void;

export enum InputTypes {
  Text = 'text',
  Password = 'password',
}

export type InputStringTypes = 'text' | 'password';

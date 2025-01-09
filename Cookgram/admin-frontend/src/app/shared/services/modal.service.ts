import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  readonly nextStepChange: Subject<void> = new Subject<void>();
  readonly backStepChange: Subject<void> = new Subject<void>();
}

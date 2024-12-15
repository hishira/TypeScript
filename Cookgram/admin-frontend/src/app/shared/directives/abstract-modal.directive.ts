import { Directive } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Directive({ providers: [ModalService] })
export class AbstractModalDirective {
  constructor(protected readonly modalService: ModalService) {}
}

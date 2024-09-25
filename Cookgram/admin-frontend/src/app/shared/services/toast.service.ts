import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorToastObject, WaringToastObject } from './consts';

@Injectable()
export class ToastService {
  constructor(private readonly messageService: MessageService) {}

  showWarning(message: string): void {
    this.messageService.add(WaringToastObject(message));
  }

  showError(message: string): void {
    this.messageService.add(ErrorToastObject(message));
  }
}

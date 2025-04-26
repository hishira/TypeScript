import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  ErrorToastObject,
  SuccessToastObject,
  WaringToastObject,
} from './consts';

@Injectable()
export class ToastService {
  constructor(private readonly messageService: MessageService) {}

  showSuccess(message: string): void {
    this.messageService.add(SuccessToastObject(message));
  }
  showWarning(message: string): void {
    this.messageService.add(WaringToastObject(message));
  }

  showError(message: string): void {
    this.messageService.add(ErrorToastObject(message));
  }
}

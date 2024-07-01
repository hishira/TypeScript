import { Injectable } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
const DefaultObjectMessage: Partial<Message> = {
  key: 'br',
  life: 2000,
};
const WaringToastObject = (message: string): Message => ({
  severity: 'warn',
  summary: 'Warning',
  detail: message,
  ...DefaultObjectMessage,
});
const ErrorToastObject = (message: string): Message => ({
  severity: 'error',
  summary: 'Error',
  detail: message,
  ...DefaultObjectMessage,
});

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

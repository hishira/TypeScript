import { Message } from 'primeng/api';

export const DefaultObjectMessage: Partial<Message> = {
  key: 'br',
  life: 2000,
};
export const WaringToastObject = (message: string): Message => ({
  severity: 'warn',
  summary: 'Warning',
  detail: message,
  ...DefaultObjectMessage,
});
export const ErrorToastObject = (message: string): Message => ({
  severity: 'error',
  summary: 'Error',
  detail: message,
  ...DefaultObjectMessage,
});

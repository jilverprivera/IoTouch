export enum MessageType {
  'success' = 'success',
  'error' = 'error',
  'warning' = 'warning',
  'info' = 'info',
}

export interface Message {
  type: MessageType;
  text: string;
}

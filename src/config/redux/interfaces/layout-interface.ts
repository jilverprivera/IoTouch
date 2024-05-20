interface Toast {
  type: ToastTypes;
  message: string | null;
  description: string | null;
  open?: boolean;
  ref?: any;
}

interface Modal {
  open: boolean;
  ref: any;
}
interface Onboarding {
  complete: boolean;
}

export enum ToastTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface LayoutSliceState {
  toast: Toast;
  modal: Modal;
  onboarding: Onboarding;
}

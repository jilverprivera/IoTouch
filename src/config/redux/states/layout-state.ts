import { LayoutSliceState, ToastTypes } from '../../redux/interfaces';

export const layoutSliceInitialState: LayoutSliceState = {
  toast: {
    open: false,
    type: ToastTypes.SUCCESS,
    message: null,
    description: null,
    ref: null,
  },
  modal: {
    open: false,
    ref: null,
  },
  onboarding: {
    complete: false,
  },
};

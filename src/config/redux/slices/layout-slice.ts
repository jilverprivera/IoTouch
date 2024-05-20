import { createSlice } from '@reduxjs/toolkit';
import { layoutSliceInitialState } from '../states/layout-state';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: layoutSliceInitialState,
  reducers: {
    // Toast
    onChangeToast: (state, { payload }) => {
      state.toast = { ...state.toast, ...payload };
    },
    setToastRef: (state, { payload }) => {
      state.toast.ref = payload;
    },
    // Modal
    onChangeModalShow: (state, { payload }) => {
      state.modal.open = payload;
    },
    setModalRef: (state, { payload }) => {
      state.modal.ref = payload;
    },
    // Onboarding
    setOnboarding: (state, { payload }) => {
      state.onboarding = payload;
    },
  },
});

export const {
  // Toast
  onChangeToast,
  setToastRef,
  // Modal
  onChangeModalShow,
  setModalRef,
  // Onboarding
  setOnboarding,
} = layoutSlice.actions;

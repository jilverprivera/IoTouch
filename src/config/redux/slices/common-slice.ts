import { createSlice } from '@reduxjs/toolkit';
import { commonState } from '../states';

export const commonSlice = createSlice({
  name: 'common',
  initialState: commonState,
  reducers: {
    onGetAreaTypes: (state, { payload }) => {
      state.areaTypes = payload;
    },
    onGetControllerTypes: (state, { payload }) => {
      state.controllerTypes = payload;
    },
    onGetDeviceTypes: (state, { payload }) => {
      state.deviceTypes = payload;
    },
    onGetCompleteTypes: (state, { payload }) => {
      state.areaTypes = payload.spaceTypes;
      state.controllerTypes = payload.controllerTypes;
      state.deviceTypes = payload.deviceTypes;
    },
  },
});

export const { onGetAreaTypes, onGetControllerTypes, onGetDeviceTypes, onGetCompleteTypes } = commonSlice.actions;

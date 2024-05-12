import { createSlice } from '@reduxjs/toolkit';
import { CommonState } from '../../../interfaces';

const initialState: CommonState = {
  areaTypes: [],
  // spaces: [],
  controllerTypes: [],
  controllers: [],
  deviceTypes: [],
};
export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    onGetAreaTypes: (state, { payload }) => {
      state.areaTypes = payload;
    },
    // onGetSpaces: (state, { payload }) => {
    //   state.spaces = payload;
    // },
    onGetControllerTypes: (state, { payload }) => {
      state.controllerTypes = payload;
    },
    onGetControllers: (state, { payload }) => {
      state.controllers = payload;
    },
    onGetDeviceTypes: (state, { payload }) => {
      state.deviceTypes = payload;
    },
    onGetCompleteTypes: (state, { payload }) => {
      // state.spaceTypes = payload.spaceTypes;
      state.controllerTypes = payload.controllerTypes;
      state.deviceTypes = payload.deviceTypes;
    },
  },
});

export const {
  onGetAreaTypes,
  // onGetSpaces,
  onGetControllerTypes,
  onGetControllers,
  onGetDeviceTypes,
  onGetCompleteTypes,
} = commonSlice.actions;

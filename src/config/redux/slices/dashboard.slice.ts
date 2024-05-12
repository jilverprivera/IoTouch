import { createSlice } from '@reduxjs/toolkit';
import { DASHBOARD_SELECTORS, DashboardSlice } from '../../../interfaces';

const initialState: DashboardSlice = {
  areas: [],
  // sharedAreas: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    onGetOwnAreas: (state, { payload }) => {
      state.areas = payload;
    },
  },
});

export const { onGetOwnAreas } = dashboardSlice.actions;

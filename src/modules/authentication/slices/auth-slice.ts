import { createSlice } from '@reduxjs/toolkit';
import { AUTH_STATUS, AuthSlice, Session } from '../interfaces/auth-interface';

const initialState: AuthSlice = {
  status: AUTH_STATUS['checking'],
  userData: null,
  session: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onSetSession: (state, { payload }) => {
      state.session = payload as Session;
      state.loading = false;
    },
    onAuthUser: (state) => {
      state.status = AUTH_STATUS.authenticated;
    },
    onLogoutUser: (state) => {
      state.status = AUTH_STATUS['not-authenticated'];
    },
    onClearAuthUser: (state) => {
      state.status = AUTH_STATUS['not-authenticated'];
    },
    onSetUserData: (state, { payload }) => {
      state.userData = payload;
    },

    onClearSession: (state) => {
      state.session = null;
      state.status = AUTH_STATUS['not-authenticated'];
      state.loading = false;
    },
  },
});

export const { onSetSession, onAuthUser, onLogoutUser, onClearAuthUser, onSetUserData, onClearSession } =
  authSlice.actions;

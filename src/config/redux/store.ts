import { configureStore } from '@reduxjs/toolkit';
import { commonSlice, dashboardSlice } from './slices';
import { authSlice } from '../../modules/authentication/slices/auth-slice';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [commonSlice.name]: commonSlice.reducer,
    [dashboardSlice.name]: dashboardSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

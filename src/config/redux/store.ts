import { configureStore } from '@reduxjs/toolkit';
import { layoutSlice } from './slices/layout-slice';
import { commonSlice } from './slices';
import { authSlice } from '../../modules/authentication/slices/auth-slice';

const store = configureStore({
  reducer: {
    [layoutSlice.name]: layoutSlice.reducer,
    [commonSlice.name]: commonSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

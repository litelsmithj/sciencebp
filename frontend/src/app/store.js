import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import protocolReducer from '../features/protocols/protocolSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    protocols: protocolReducer
  },
});

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import protocolReducer from '../features/protocols/protocolSlice';
import articleReducer from '../features/articles/articleSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    protocols: protocolReducer,
    articles: articleReducer,
    ui: uiReducer
  },
});

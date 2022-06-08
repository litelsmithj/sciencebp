import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import protocolReducer from '../features/protocols/protocolSlice';
import articleReducer from '../features/articles/articleSlice';
import trackerReducer from '../features/trackers/trackerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    protocols: protocolReducer,
    articles: articleReducer,
    trackers: trackerReducer
  },
});

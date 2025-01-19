import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'; // Import persistReducer
import storage from 'redux-persist/lib/storage'; // LocalStorage (or sessionStorage)

// Import your reducers
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import postsReducer from '../slices/postSlice';
import collectionsReducer from '../slices/collectionSlice';

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage, // You can use sessionStorage or other storage methods if needed
  whitelist: ['auth', 'profile', 'posts'], // Add reducers that should be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  collections: collectionsReducer,
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

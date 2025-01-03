import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import postsReducer from '../slices/postSlice';
import collectionsReducer from '../slices/collectionSlice'; 


const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  collections: collectionsReducer,

});

export default rootReducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],  // Holds all posts
  loading: false, // Loading state for UI feedback
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Replace the current posts array with a new one
    setPosts(state, action) {
      state.posts = action.payload;
    },
    
    // Add a single new post to the existing posts array
    addPost(state, action) {
      state.posts = [action.payload, ...state.posts]; // Prepend to maintain recent post at top
    },
    
    // Update the loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setPosts, addPost, setLoading } = postsSlice.actions;

export default postsSlice.reducer;

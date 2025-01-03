import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setPosts, setLoading } = postsSlice.actions;
export default postsSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   posts: [], // List of posts
//   selectedPost:null,
// };

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     setPosts: (state, action) => {
//       state.posts = action.payload;
//     },
//     setSelectedPost: (state, action) => {
//       state.selectedPost = action.payload;
//     },
//   },
// });

// export const { setPosts, setSelectedPost } = postsSlice.actions;

// export default postsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  selectedPost: null,
  page: 1,
  hasMore: true,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = Array.isArray(action.payload) ? action.payload : [];
    },
    setSelectedPost(state, action) {
      state.selectedPost = action.payload || null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const { setPosts, setSelectedPost, setPage, setHasMore } = postsSlice.actions;

export default postsSlice.reducer;

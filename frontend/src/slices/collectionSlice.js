import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collections: [],
  loading: false,
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections(state, action) {
      state.collections = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCollections, setLoading } = collectionsSlice.actions;
export default collectionsSlice.reducer;
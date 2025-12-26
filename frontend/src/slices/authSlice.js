// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   signupData: null,
//   loading: false,
//   token: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setSignupData(state, action) {
//       state.signupData = action.payload;
//     },
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//     setToken(state, action) {
//       const tokenData = action.payload;
//       const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // Token expires after 1 day
    
//       const currentTime = new Date().getTime();
//       if (currentTime < expiryTime) {
//         state.token = { token: tokenData, expiry: expiryTime };
//       } else {
//         state.token = null; // Clear token if expired
//       }
//     },
    
//     clearToken(state) {
//       state.token = null; // Explicitly clear the token
//     },
//   },
// });

// export const { setSignupData, setLoading, setToken, clearToken } = authSlice.actions;

// export default authSlice.reducer;






import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: null, // { token, expiry } OR null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setToken(state, action) {
      const tokenValue = action.payload;

      if (!tokenValue) {
        state.token = null;
        return;
      }

      const expiry = Date.now() + 24 * 60 * 60 * 1000;

      state.token = {
        token: tokenValue,
        expiry,
      };
    },

    clearToken(state) {
      state.token = null;
    },
  },
});

export const { setSignupData, setLoading, setToken, clearToken } =
  authSlice.actions;

export default authSlice.reducer;

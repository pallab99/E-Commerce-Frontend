import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isLoggedIn: false,
  user: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
});

export const { logInUser } = authSlice.actions;
export default authSlice.reducer;

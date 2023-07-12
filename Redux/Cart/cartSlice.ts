import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items:[],
  addedToCart:0
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartItems: (state) => {        
      state.addedToCart+=1;
    },
  },
});

export const { cartItems } = cartSlice.actions;
export default cartSlice.reducer;

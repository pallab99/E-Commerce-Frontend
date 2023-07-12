import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items:[],
  addedToCart:0,
  removeFromCart:0
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartItems: (state) => {        
      state.addedToCart+=1;
    },
    removeItems: (state) => {        
      state.removeFromCart+=1;
    },
  },
});

export const { cartItems,removeItems } = cartSlice.actions;
export default cartSlice.reducer;

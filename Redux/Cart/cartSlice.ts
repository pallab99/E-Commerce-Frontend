import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items:[],
  addedToCart:false,
  removeFromCart:0
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartItems: (state) => {              
      state.addedToCart=!state.addedToCart;
    },
    removeItems: (state) => {        
      state.removeFromCart+=1;
    },
  },
});

export const { cartItems,removeItems } = cartSlice.actions;
export default cartSlice.reducer;

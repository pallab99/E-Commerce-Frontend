import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  orderDetails: {
    address: '',
    products: '',
    userId: localStorage.getItem('userInfo'),
    paymentMethod: 'cash',
  },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    userAddress: (state, action) => {
      state.orderDetails.address = action.payload;
    },
    paymentMethod: (state, action) => {
      state.orderDetails.paymentMethod = action.payload;
    },
    orderedProducts: (state, action) => {
      state.orderDetails.products = action.payload;
    },
  },
});

export const { userAddress, paymentMethod, orderedProducts } =
  orderSlice.actions;
export default orderSlice.reducer;

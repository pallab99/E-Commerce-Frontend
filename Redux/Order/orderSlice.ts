import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  orderDetails: {
    address: '',
    products: '',
    userId: 0,
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
    userId: (state, action) => {
      state.orderDetails.userId = +action.payload;
    },
  },
});

export const { userAddress, paymentMethod, orderedProducts,userId } =
  orderSlice.actions;
export default orderSlice.reducer;

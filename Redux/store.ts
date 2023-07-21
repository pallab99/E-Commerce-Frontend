import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import cartReducer from './Cart/cartSlice';
import orderSlice from './Order/orderSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

'use client';
import getCartItems from '@/Api/getCartItemsByUserId';
import { cartItems } from '@/Redux/Cart/cartSlice';
import axios from 'axios';
import React, { useEffect,  } from 'react';
import { useDispatch } from 'react-redux';

export default function Index({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem('userInfo');
    if (userId) {
      getCartItems(userId);
    }
  }, []);
  
  return <div>{children}</div>;
}

/* eslint-disable @next/next/no-img-element */
import getCartItems from '@/Api/getCartItemsByUserId';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Cart from '@/Components/Cart'
import { useSelector } from 'react-redux';
export default function Index(props:any) {
  const [products, setProducts] = useState() as any;

  useEffect(() => {
    const userId = localStorage.getItem('userInfo');
    if (userId) {
      handleGetCartItems(userId);
    }
  }, []);
  const handleGetCartItems = async (userId: any) => {
    try {
      const response = await getCartItems(userId);
      setProducts(response?.items);
    } catch (error: any) {}
  };

  return (
    <>
     <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
            <Cart/>
          </div>
    </>
  )
}

/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { getMyOrders } from '@/Api/getMyOrders';
import Loader from '@/Components/Loader';
export default function Index() {
  const [orderDetails, setOrderDetails] = useState([]) as any;
  useEffect(() => {
    const userId = window.localStorage.getItem('userInfo');
    handleGetMyOrders(userId);
  }, []);
  const handleGetMyOrders = async (userId: any) => {
    try {
      const orderDetails = await getMyOrders(userId);
      console.log(orderDetails.data);

      setOrderDetails(orderDetails?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar></Navbar>
      {!orderDetails ? (
        <Loader></Loader>
      ) : (
        orderDetails.map((order: any) => {
          return (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-5">
                    order # {order?._id}
                  </h1>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.items.map((product: any) => (
                        <li key={product.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.product.thumbnail}
                              alt={product.product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.product.href}>
                                    {product.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">${product.product.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline text-sm font-medium leading-6 text-gray-900 mr-5"
                                >
                                  QTY
                                </label>
                                {product?.quantity}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items In Cart</p>
                    <p>{order.totalItems} items</p>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import getCartItems from '@/Api/getCartItemsByUserId';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeItems } from '@/Redux/Cart/cartSlice';
import { orderedProducts, userIdDetails } from '@/Redux/Order/orderSlice';
import { message } from 'antd';
import { addOrder } from '@/Api/addOrders';

export default function Index() {
  const router = useRouter();
  const path = usePathname();
  const [products, setProducts] = useState() as any;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state: any) => state.order.orderDetails);

  useEffect(() => {
    const userId = localStorage.getItem('userInfo');
    if (userId) {
      handleGetCartItems(userId);
    }
  }, []);
  const handleGetCartItems = async (userId: any) => {
    try {
      const response = await getCartItems(userId);
      dispatch(orderedProducts(response?.items));
      dispatch(userIdDetails(userId));
      setProducts(response?.items);
    } catch (error: any) {}
  };
  const handleRemoveItems = async (e: any, itemId: any) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:8080/cart/${itemId}`
      );
      const remainItems = products?.filter((item: any) => {
        return item.id != itemId;
      });
      dispatch(removeItems());
      setProducts(remainItems);
    } catch (error: any) {}
  };
  const handleQuantity = async (e: any, product: any) => {
    e.preventDefault();
    try {
      const data = { ...product, quantity: e.target.value };
      const response = await axios.put(
        `http://localhost:8080/cart/${data.id}`,
        data
      );

      const updatedItems = products.map((item: any) => {
        if (item.id === response.data.id) {
          // Create a new object with the updated 'quantity' property
          const updatedItem = { ...item, quantity: e.target.value };
          return updatedItem;
        }
        return item;
      });

      setProducts(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (let i = 0; i < products?.length; i++) {
      totalAmount += products[i]?.product?.price * products[i]?.quantity;
    }
    return totalAmount;
  };
  const getTotalItems = () => {
    let totalItems = 0;
    for (let i = 0; i < products?.length; i++) {
      totalItems += +products[i]?.quantity;
    }
    return totalItems;
  };
  const getItemPrice = (product: any) => {
    return product?.product.price * product?.quantity;
  };

  const handleOrder = () => {
    if (orderDetails.address === '') {
      message.error('Please add an address');
    } else {
      handleAddOrder();
    }
  };

  const handleAddOrder = async () => {
    const totalAmount = getTotalAmount();
    const totalItems = getTotalItems();
    try {
      await addOrder(orderDetails, totalAmount, totalItems);
      message.success('Order placed successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-5">
            All Products
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products &&
                products.map((product: any) => (
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
                          <p className="ml-4">${getItemPrice(product)}</p>
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
                          <select
                            onChange={(e) => handleQuantity(e, product)}
                            defaultValue={product?.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => handleRemoveItems(e, product.id)}
                          >
                            Remove
                          </button>
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
            <p>${getTotalAmount()}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items In Cart</p>
            <p>{getTotalItems()} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            {!path.includes('checkout') ? (
              <Link
                href="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            ) : (
              <div
                onClick={handleOrder}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
              >
                Order and pay
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                onClick={() => {
                  router.push('/');
                }}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Button, Skeleton } from 'antd';
import getUserDetailsAndAddresses from '@/Api/getUserAddress';
import { removeUserAddress } from '@/Api/deleteUserAddress';

export default function Index() {
  const [userDetails, setUserDetails] = useState<any>([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState();
  useEffect(() => {
    const userId = window.localStorage.getItem('userInfo');
    handleGetUserDetails_And_Addresses(userId);
  }, []);

  const handleGetUserDetails_And_Addresses = async (userId: any) => {
    try {
      const response = await getUserDetailsAndAddresses(userId);
      setUserDetails(response.data);
      setUserAddresses(response.data.addresses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSelectedAddress = (e: any) => {
    setSelectedAddress(e.target.value);
  };
  const handleRemovedAddress = async (e: any) => {
    e.preventDefault();
    try {
      const response = await removeUserAddress(
        userDetails,
        userAddresses,
        selectedAddress
      );
      setUserDetails(response?.data);
      setUserAddresses(response?.data?.addresses);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-5">
            Name : {userDetails?.name || 'Guest User'}
          </h1>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-5">
            Email Address : {userDetails?.email || 'guestuser@gmail.com'}
          </h1>
          <div className="flex sm:flex sm:flex-col sm:items-end lg:justify-center mb-3 items-end justify-end">
            <Button
              disabled={selectedAddress ? false : true}
              onClick={handleRemovedAddress}
              className="rounded-md bg-indigo-600 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  text-white"
            >
              Remove
            </Button>
          </div>
          {loading ? (
            <Skeleton loading={loading} avatar paragraph={{ rows: 4 }} />
          ) : (
            <ul role="list">
              {userAddresses &&
                userAddresses?.map((item: any, index: number) => (
                  <li
                    key={item?.id}
                    className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 mb-3 text-black"
                  >
                    <div className="flex gap-x-4">
                      <input
                        onChange={(e) => handleSelectedAddress(e)}
                        name="address"
                        type="radio"
                        value={index}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {item?.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {item?.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {item?.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {item?.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {item?.city}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

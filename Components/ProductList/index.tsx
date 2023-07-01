/* eslint-disable @next/next/no-img-element */
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '../Loader';
import { Spin } from 'antd';

export default function ProductList(props: any) {
  useEffect(() => {
    getAllProducts();
  }, [props.filter, props.sort]);
  const [products, setProducts] = useState([]);
  const [allProductsLoader, setAllProductsLoader] = useState(true);

  const getAllProducts = () => {
    setAllProductsLoader(true);
    console.log(props?.filter);

    let queryString = '';
    for (let key in props?.filter) {
      queryString += `${key}=${props?.filter[key]}&`;
      const categoryValues = props?.filter[key];
      if (categoryValues.length) {
        const lastCategoryValue = categoryValues[categoryValues.length - 1];
        queryString += `${key}=${lastCategoryValue}&`;
      }
    }
    let sortQueryString = '';
    for (let key in props?.sort) {
      sortQueryString += `${key}=${props?.sort[key]}&`;
    }
    const isCategoryEmpty =
      !props?.filter?.category ||
      Object.keys(props.filter.category).length === 0;
    const isBrandEmpty =
      !props?.filter?.brand || Object.keys(props.filter.brand).length === 0;

    if (isCategoryEmpty) {
      queryString = queryString.replace('category=&', '');
    }

    if (isBrandEmpty) {
      queryString = queryString.replace('brand=&', '');
    }

    axios
      .get('http://localhost:8080/products?' + queryString + sortQueryString)
      .then((res) => {
        setProducts(res.data);
        setAllProductsLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setAllProductsLoader(false);
      });
  };

  const router = useRouter();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        {allProductsLoader ? (
          <Spin
            size="large"
            className="flex justify-center my-3 text-4xl"
          ></Spin>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map((product: any) => (
              <div
                key={product.id}
                className="group relative rounded-sm"
                onClick={() => {
                  router.push('/product-details');
                }}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product?.thumbnail}
                    alt={product?.thumbnail}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product?.thumbnail}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product?.title}
                      </a>
                    </h3>
                    <div className="flex justify-start items-center gap-2 mt-1 text-sm text-gray-500">
                      <StarIcon className="w-6 h-6" />
                      {product?.rating}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      $
                      {Math.round(
                        product?.price * (1 - product?.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm font-medium text-gray-500 line-through">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-0 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                <a
                  href="#"
                  aria-current="page"
                  className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  3
                </a>

                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

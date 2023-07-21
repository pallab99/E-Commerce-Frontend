/* eslint-disable @next/next/no-img-element */
// "use client"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/20/solid';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import getAllProducts from '@/Api/getAllProducts';
import { ITEMS_PER_PAGE } from '@/Constants/constants';
import { block } from 'million/react';

export default function Index(props: any) {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    handleGetAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filter, props.sort, page]);
  useEffect(() => {
    setPage(1);
  }, [totalItems, props.sort]);
  const [products, setProducts] = useState([]) as any;
  const [allProductsLoader, setAllProductsLoader] = useState(true);
  const handlePage = (page: number) => {
    setPage(page);
  };
  const handleGetAllProducts = async () => {
    const Pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    try {
      setAllProductsLoader(true);
      const products = await getAllProducts(props, Pagination);
      console.log("12233",products);
      
      setProducts(products.data);
      setTotalItems(products.totalItems);
      setAllProductsLoader(false);
    } catch (error) {
      message.error("Can't load products");
      setAllProductsLoader(false);
    }
  };
  const router = useRouter();
  return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          {allProductsLoader ? (
            <Spin size="large" className="flex justify-center py-10" />
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products?.map((product: any) => (
                <div
                  key={product.id}
                  className="group relative rounded-sm cursor-pointer"
                  onClick={() => {
                    router.push(`/productDetails/${product.id}`);
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
                        <div>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product?.title}
                        </div>
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
          <Pagination
            page={page}
            totalItems={totalItems}
            handlePage={handlePage}
          ></Pagination>
        </div>
      </div>
  );
}

function Pagination(props: any) {
  return (
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
            Showing{' '}
            <span className="font-medium">
              {(props.page - 1) * ITEMS_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {props.page * ITEMS_PER_PAGE > props.totalItems
                ? props.totalItems
                : props.page * ITEMS_PER_PAGE}
            </span>{' '}
            of <span className="font-medium">{props.totalItems}</span> results
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

            <div>
              {Array.from({
                length: Math.ceil(props.totalItems / ITEMS_PER_PAGE),
              }).map((el, index) => (
                <div
                  onClick={() => props.handlePage(index + 1)}
                  key={index}
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center ${
                    index + 1 == props.page
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-600'
                  } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
                >
                  {index + 1}
                </div>
              ))}
            </div>

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
  );
}


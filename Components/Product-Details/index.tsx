/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import getSingleProductDetails from '@/Api/getSingleProductDetails';
import Navbar from '../Navbar';
import addToCart from '@/Api/addToCart';
import { useDispatch } from 'react-redux';
import { cartItems } from '@/Redux/Cart/cartSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from '@/Components/Loader';
import { useRouter } from 'next/navigation';
import { message } from 'antd';

export default function Index(props: any) {
  const router = useRouter();
  const [product, setProduct] = useState([]) as any;
  const [images, setImages] = useState([]);
  const [productDetailsLoader, setProductDetailsLoader] = useState(true);
  useEffect(() => {
    console.log('productDetails Components', props.productId);
    handleGetSingleProductDetails(props.productId);
  }, [props.productId]);

  const handleGetSingleProductDetails = async (productId: any) => {
    try {
      setProductDetailsLoader(true);
      const { product, images } = await getSingleProductDetails(productId);
      setProduct(product);
      setImages(images);
      setProductDetailsLoader(false);
    } catch (error) {
      console.log(error);
      setProductDetailsLoader(false);
    }
  };
  const dispatch = useDispatch();
  const handleAddToCart = async (e: any) => {
    e.preventDefault();
    const userId = window.localStorage.getItem('userInfo');
    if (!userId) {
      router.push("/signin")
      message.error('Please Sign In Before Adding To Cart');
    } else {
      await addToCart(product);
      dispatch(cartItems());
    }
  };

  return (
    <>
      <Navbar />

      {productDetailsLoader ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                {product.breadcrumbs &&
                  product.breadcrumbs.map((breadcrumb: any) => (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center">
                        <a
                          href={breadcrumb.href}
                          className="mr-2 text-sm font-medium text-gray-900"
                        >
                          {breadcrumb.name}
                        </a>
                        <svg
                          width={16}
                          height={20}
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 w-4 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>
                  ))}
                <li className="text-sm">
                  <div
                    // href={product.href}
                    aria-current="page"
                    className="text-3xl text-gray-500 hover:text-gray-600"
                  >
                    {product.title}
                  </div>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <LazyLoadImage
                  src={images[0]}
                  alt={product?.title}
                  effect="blur"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <LazyLoadImage
                    src={images[1]}
                    alt={product?.title}
                    effect="blur"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <LazyLoadImage
                    src={images[2]}
                    alt={product?.title}
                    effect="blur"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-3 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg mx-2">
                <LazyLoadImage
                  src={images[1]}
                  alt={product?.title}
                  effect="blur"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  $ {product.price}
                </p>

                <form className="mt-10">
                  <button
                    onClick={handleAddToCart}
                    // type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

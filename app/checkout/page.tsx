/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter,usePathname } from 'next/navigation';

import Form from "../../Components/Checkout/Form";
import Products_Added_To_The_Cart from "../../Components/Checkout/Products"
import Navbar from '@/Components/Navbar';
const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];

const addresses = [
  {
    name: 'John wick',
    street: '11th Main',
    city: 'Delhi',
    pinCode: 110001,
    state: 'Delhi',
    phone: 12312321331,
  },
  {
    name: 'John Doe',
    street: '15th Main',
    city: 'Bangalore',
    pinCode: 560034,
    state: 'Karnataka',
    phone: 123123123,
  },
];
export default function Page() {
  const router = useRouter();
  const path=usePathname()
  console.log(path);
  

  return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Navbar />
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <Form addresses={addresses}></Form>
          <div className="lg:col-span-2">
           <Products_Added_To_The_Cart products={products}></Products_Added_To_The_Cart>
          </div>
        </div>
      </div>
  );
}

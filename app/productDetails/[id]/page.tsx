'use client';
import Navbar from '@/Components/Navbar';
import Product_Details from '../../../Components/Product-Details';
import { Suspense } from 'react';
import { Skeleton } from 'antd';

export default function Page({ params }: { params: { id: string } }) {
  console.log('Product details page', params.id);

  return (
    <>
      <Suspense fallback={<Skeleton active></Skeleton>}>
        <Product_Details productId={params.id} />
      </Suspense>
    </>
  );
}

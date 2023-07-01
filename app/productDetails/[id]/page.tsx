"use client"
import Navbar from '@/Components/Navbar';
import Product_Details from '../../../Components/Product-Details';

export default function Page({ params }: { params: { id: string } }) {
  console.log("Product details page",params.id);
  
  return (
    <>
      <Navbar />
      <Product_Details productId={params.id}/>
    </>
  );
}



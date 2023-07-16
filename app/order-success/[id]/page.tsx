import Link from 'next/link';

export default function page({ params }: { params: { id: string } }) {
    console.log({params});
    
  return (
    <>
      <main className="grid h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-4xl font-semibold text-indigo-600">Order Placed Successfully</p>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Id : #{params.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            you can check your order from your profile
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

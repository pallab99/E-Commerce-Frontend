/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function index() {
  return (
    <>
      <div className="container-fluid  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-8">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body cart">
                <div className="col-sm-12 empty-cart-cls text-center">
                  <div className="flex justify-center">
                    <img
                      alt="cart-empty"
                      src="https://i.imgur.com/dCdflKN.png"
                      width="130"
                      height="130"
                      className="img-fluid mb-4 mr-3"
                    />
                  </div>
                  <h3>
                    <strong>Your Cart is Empty</strong>
                  </h3>
                  <h4>Add something to make me happy :)</h4>
                  <div className="mt-6">
                    <Link
                      href="/"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

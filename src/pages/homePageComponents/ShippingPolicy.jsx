import React from 'react';

function ShippingPolicy() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Shipping Policy</h1>
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-800">Order Processing Time</h2>
            <p className="mt-2">You will receive an email as soon as the products are dispatched for delivery with the relevant tracking details.</p>
            <p className="mt-2">Delivery could take between 1-3 working days excluding weekends and public holidays from the day of dispatch depending on the payment method you choose.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">Same Day Delivery (Within Colombo & Suburbs Only)</h2>
            <p className="mt-2">We provide same-day delivery service for specific areas within Colombo and its suburbs. To receive your order on the same day you place it, simply ensure that you place your order before 3 PM.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">Delivery Charges</h2>
            <p className="mt-2">Standard Delivery Charge: <strong>LKR 350.00</strong></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">Shipping Notifications</h2>
            <p className="mt-2">Once you place an order, you will receive a confirmation email containing a tracking number. This will allow you to monitor the status of your shipment.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">Damages</h2>
            <p className="mt-2">We understand that you may receive damaged items due to transit. If a product is defective or damaged, this must be reported on the same day of delivery with pictures.</p>
            <p className="mt-2">If the product is deemed defective, Blush Me will replace the product at no additional charge to the customer. Just drop your query to our customer service for more details at <a href="dammamonnankulama@gmail.com" className="text-blue-600">dammamonnankulama@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">International Shipping</h2>
            <p className="mt-2">Currently, we do not offer international shipping.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;
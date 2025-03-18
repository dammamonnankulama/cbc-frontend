import React, { useState } from 'react';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Shipping & Delivery</h1>

        <div className="space-y-6">
          {/* FAQ Item 1 */}
          <div>
            <button
              className="w-full text-left text-lg font-semibold text-gray-800 p-4 bg-gray-100 rounded-lg focus:outline-none"
              onClick={() => toggleAnswer(0)}
            >
              How long does it take to deliver my order?
            </button>
            {activeIndex === 0 && (
              <p className="text-gray-700 px-4 pb-4 bg-gray-100 rounded-lg">
                You will receive an email as soon as the products are dispatched for delivery with the relevant tracking details. Delivery could take between 2-3 working days excluding weekends and public holidays from the day of dispatch, depending on the payment method you choose.
              </p>
            )}
          </div>

          {/* FAQ Item 2 */}
          <div>
            <button
              className="w-full text-left text-lg font-semibold text-gray-800 p-4 bg-gray-100 rounded-lg focus:outline-none"
              onClick={() => toggleAnswer(1)}
            >
              Do you offer Cash on Delivery?
            </button>
            {activeIndex === 1 && (
              <p className="text-gray-700 px-4 pb-4 bg-gray-100 rounded-lg">
                We have only Cash on Delivery (COD) at the moment.
              </p>
            )}
          </div>

          {/* FAQ Item 3 */}
          <div>
            <button
              className="w-full text-left text-lg font-semibold text-gray-800 p-4 bg-gray-100 rounded-lg focus:outline-none"
              onClick={() => toggleAnswer(2)}
            >
              How much is delivery?
            </button>
            {activeIndex === 2 && (
              <p className="text-gray-700 px-4 pb-4 bg-gray-100 rounded-lg">
                - Bank Transfer/Card Payment: LKR 350.00 <br />
                - Same Day Delivery: LKR 450.00
              </p>
            )}
          </div>

          {/* FAQ Item 4 */}
          <div>
            <button
              className="w-full text-left text-lg font-semibold text-gray-800 p-4 bg-gray-100 rounded-lg focus:outline-none"
              onClick={() => toggleAnswer(3)}
            >
              Do you deliver to locations out of Colombo?
            </button>
            {activeIndex === 3 && (
              <p className="text-gray-700 px-4 pb-4 bg-gray-100 rounded-lg">
                Yes, we deliver island-wide.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;

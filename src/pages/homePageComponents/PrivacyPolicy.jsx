import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Privacy Policy</h1>
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-800">What Information Do We Collect?</h2>
            <p className="mt-2">We collect information from you when you register on our site, place an order, or subscribe to our newsletter.</p>
            <p className="mt-2">When ordering or registering on our site, you may be asked to enter your: name, e-mail address, mailing address, phone number, or credit card information. You may, however, visit our site anonymously.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">What Do We Use Your Information For?</h2>
            <p className="mt-2">Any of the information we collect from you may be used in one of the following ways:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li><strong>To personalize your experience:</strong> Your information helps us to better respond to your individual needs.</li>
              <li><strong>To improve our website:</strong> We continually strive to improve our website offerings based on the information and feedback we receive from you.</li>
              <li><strong>To improve customer service:</strong> Your information helps us to more effectively respond to your customer service requests and support needs.</li>
              <li><strong>To process transactions:</strong> Your information will not be sold, exchanged, transferred, or given to any other company for any reason other than for the purpose of delivering the purchased product or service requested by the customer.</li>
              <li><strong>To send periodic emails:</strong> The email address you provide for order processing may be used to send you information and updates pertaining to your order or request, as well as occasional company news, updates, promotions, related product or service information, etc. (You can unsubscribe at any time.)</li>
              <li><strong>To administer a contest, promotion, survey, or other site feature.</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">Do We Use Cookies?</h2>
            <p className="mt-2">No, we do not use cookies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">Do We Disclose Any Information to Outside Parties?</h2>
            <p className="mt-2">We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">Third-Party Links</h2>
            <p className="mt-2">Occasionally, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We are not responsible for the content and activities of these linked sites. However, we seek to protect the integrity of our site and welcome any feedback about these sites.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">Your Consent</h2>
            <p className="mt-2">By using our site, you consent to our privacy policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800">Changes to Our Privacy Policy</h2>
            <p className="mt-2">If we decide to change our privacy policy, we will post those changes on this page, and/or update the Privacy Policy modification date below. Policy changes will apply only to information collected after the date of the change.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
import React, { useState } from 'react'

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit the form (you can integrate with an API or backend here)
    console.log(formData);
    alert('Your message has been sent!');
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Need Assistance?</h1>
        <p className="text-lg text-gray-700 mb-6">
          Our customer service team is at your service Monday through Saturday, from 10 AM to 5 PM, to address any order-related concerns. Please don't hesitate to contact us via WhatsApp or call at +94770487905. We're here to help!
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Reach out via Social Media: We're here to help you out whenever you need us! Got questions, problems, or need some guidance? Just shoot us a message!
        </p>

        <p className="text-lg text-gray-700 mb-6">
          You can also find us on Facebook and Instagram for live chat support if you need immediate assistance.
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Drop us a line at <span className="text-blue-600">dammamonnankulama@gmail.com</span>
        </p>
        
        <h2 className="text-3xl font-semibold text-gray-900 mt-12 mb-8">Contact Us</h2>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="6"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs;

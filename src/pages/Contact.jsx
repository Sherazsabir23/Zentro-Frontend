import React, { useState } from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("This is a demo contact form. Form submission is not functional.");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center">
      <div className=" max-w-4xl w-full mx-auto p-6 md:p-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Get in Touch</h2>
            <p className="text-gray-600">
              Have questions? We're here to help. Send us a message and we'll get back to you shortly.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <AiOutlineEnvironment size={24} />
                <span>123 Demo Street, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <AiOutlinePhone size={24} />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <AiOutlineMail size={24} />
                <span>support@demo.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4">
              <FaFacebookF size={20} className="text-gray-600 hover:text-blue-600 cursor-pointer" />
              <FaTwitter size={20} className="text-gray-600 hover:text-blue-400 cursor-pointer" />
              <FaInstagram size={20} className="text-gray-600 hover:text-pink-500 cursor-pointer" />
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="bg-white p-6 rounded-xl shadow-md space-y-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-md font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

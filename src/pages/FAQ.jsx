import React, { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  { question: "How can I track my order?", answer: "Go to 'My Orders'. Demo feature only." },
  { question: "Can I cancel my order?", answer: "Yes, before shipping. After shipping, cancel not allowed." },
  { question: "What payment methods do you accept?", answer: "Demo supports cards & PayPal." },
  { question: "Do you offer international shipping?", answer: "Not available in this portfolio demo." },
  { question: "How do I contact customer support?", answer: "Use the 'Contact Us' page. Demo only." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-700 text-lg md:text-xl">Everything you need to know about our demo store.</p>
      </section>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-xl  shadow hover:shadow-lg transition-shadow">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <FaQuestionCircle className="text-orange-500" />
                <span className="font-medium">{faq.question}</span>
              </div>
              <FaChevronDown
                className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

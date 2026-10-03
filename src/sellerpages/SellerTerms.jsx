import React from "react";

function SellerTerms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 font-roboto">
      <div className="max-w-5xl mx-auto">

        {/* Heading */} 
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center font-montserrat">
          Seller Terms & Conditions
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          Welcome to <strong>Zentro</strong>. By becoming a seller on our platform, you agree to follow these terms and conditions. These rules are designed to ensure a smooth, fair, and reliable experience for both sellers and customers.
        </p>

        {/* Terms Sections */}
        <section className="space-y-8 text-gray-700 text-lg leading-relaxed">

          <div>
            <h2 className="text-2xl font-semibold mb-2 font-montserrat" >1. Seller Responsibility</h2>
            <p>
              Sellers must provide genuine, original, and high-quality products. Any misleading, fake, or illegal items are strictly not allowed and may result in account suspension.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 font-montserrat">2. Product Handover & Delivery</h2>
            <p>
              Once an order is placed, the seller must hand over the product to the admin within the specified time. The admin is responsible for packaging, shipping, and customer delivery.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 font-montserrat">3. Payments & Earnings</h2>
            <p>
              Seller payments are released after the successful delivery of the product. Returns, cancellations, or damaged items may affect the final payment amount.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 font-montserrat">4. Quality & Compliance</h2>
            <p>
              All products must comply with platform policies and local laws. Repeated quality issues may lead to temporary or permanent restrictions on the seller account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 font-montserrat">5. Account Suspension</h2>
            <p>
              Zentro reserves the right to suspend or terminate any seller account that violates platform rules, delivers fake or low-quality products, or engages in behavior harming customer trust.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 font-montserrat">6. Policy Updates</h2>
            <p>
              These terms may be updated from time to time. Sellers are responsible for reviewing the latest policies regularly.
            </p>
          </div>

        </section>

        {/* Footer Note */}
        <p className="mt-12 text-gray-500 text-base text-center">
          By continuing to sell on <strong>Zentro</strong>, you agree to follow these terms and help maintain a safe and professional marketplace.
        </p>

      </div>
    </div>
  );
}

export default SellerTerms;

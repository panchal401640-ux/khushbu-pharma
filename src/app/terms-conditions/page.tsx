"use client";

import { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";

export default function TermsConditionsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions | Khushbu Pharma Machinery";
  }, []);

  return (
    <>
      <Breadcrumb
        title="Terms & Conditions"
        items={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">
            Last Updated: January 1, 2026
          </p>
          <p className="text-gray-600 mb-6">
            These Terms and Conditions govern your use of the Khushbu Pharma Machinery website and the purchase of pharmaceutical machinery, equipment, and related services. By accessing our website or placing an order, you agree to be bound by these terms.
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing this website or submitting a quotation request, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our website or services.
              </p>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time without prior notice. Continued use of our website following any changes constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Products and Services</h2>
              <p className="text-gray-600 mb-4">
                Khushbu Pharma Machinery manufactures, supplies, and exports pharmaceutical machinery and equipment. All product descriptions, specifications, images, and pricing on our website are provided for informational purposes and are subject to change without notice.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Product images may differ slightly from actual items due to manufacturing variations, lighting conditions, and display settings.</li>
                <li>Technical specifications are subject to change as part of our continuous improvement process.</li>
                <li>We reserve the right to discontinue any product without prior notice.</li>
                <li>Actual product availability may vary and will be confirmed at the time of order processing.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Quotations and Orders</h2>
              <p className="text-gray-600 mb-4">
                All quotations provided by Khushbu Pharma Machinery are valid for the period specified in the quotation document. A quotation does not constitute a binding contract and is subject to the following:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Quotation prices are in Indian Rupees (INR) unless otherwise specified, and are exclusive of applicable taxes, shipping, and installation charges.</li>
                <li>Orders placed against a quotation are subject to acceptance and confirmation by Khushbu Pharma Machinery.</li>
                <li>We reserve the right to accept or decline any order at our sole discretion.</li>
                <li>Any changes to confirmed orders must be communicated in writing and may be subject to price adjustments.</li>
                <li>Custom or modified machinery specifications may incur additional costs, which will be communicated prior to order confirmation.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <p className="text-gray-600 mb-4">
                Payment terms for all orders will be specified in the respective quotation and invoice. Unless otherwise agreed upon in writing:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>An advance payment of 50% is required upon order confirmation.</li>
                <li>The remaining balance is due prior to dispatch or as per the payment schedule outlined in the order confirmation.</li>
                <li>Payments can be made via bank transfer (NEFT/RTGS/IMPS), cheque, or demand draft.</li>
                <li>Late payments may attract interest at the rate of 1.5% per month on the outstanding amount.</li>
                <li>All applicable GST and other statutory taxes will be charged as per prevailing government regulations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Delivery</h2>
              <p className="text-gray-600 mb-4">
                Delivery timelines provided at the time of order confirmation are estimates and are subject to change based on production schedules, raw material availability, and logistics constraints.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Risk of loss and title transfer to the buyer upon delivery of the goods to the designated carrier or delivery location.</li>
                <li>Installation and commissioning services, where applicable, will be scheduled separately and may incur additional charges.</li>
                <li>Delays caused by force majeure events, government regulations, or unforeseen circumstances shall not entitle the buyer to claim compensation.</li>
                <li>The buyer is responsible for ensuring adequate access and facilities at the delivery location for safe unloading of machinery.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Warranty</h2>
              <p className="text-gray-600 mb-4">
                Khushbu Pharma Machinery provides a standard warranty on all manufactured machinery as specified in the product documentation. The warranty covers defects in materials and workmanship under normal operating conditions.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Warranty period commences from the date of delivery or commissioning, whichever is earlier.</li>
                <li>Warranty does not cover damage caused by misuse, negligence, improper installation by the buyer, unauthorized modifications, or use of non-recommended consumables.</li>
                <li>Warranty claims must be reported in writing within 7 days of discovering the defect.</li>
                <li>Khushbu Pharma Machinery reserves the right to inspect, repair, or replace defective parts at its sole discretion.</li>
                <li>Warranty is limited to the original purchaser and is non-transferable.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by applicable law, Khushbu Pharma Machinery shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our products or services.
              </p>
              <p className="text-gray-600">
                Our total liability for any claim arising from or related to the sale of products shall not exceed the purchase price of the product giving rise to the claim. This limitation applies regardless of the form of action, whether in contract, tort, or otherwise.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, product descriptions, technical drawings, and software, is the property of Khushbu Pharma Machinery and is protected by applicable intellectual property laws.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Unauthorized reproduction, distribution, or use of any content from this website is strictly prohibited.</li>
                <li>Product designs, manufacturing processes, and proprietary technologies are the intellectual property of Khushbu Pharma Machinery.</li>
                <li>Any trademarks, logos, or brand names displayed on the website are the registered properties of their respective owners.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat, India.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
              <p className="text-gray-600 mb-4">
                For any questions or concerns regarding these Terms and Conditions, please contact:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 font-semibold">Khushbu Pharma Machinery</p>
                <p className="text-gray-600">Email: info@khushbupharmamachinery.com</p>
                <p className="text-gray-600">Phone: +91 98765 43210</p>
                <p className="text-gray-600">Address: Ahmedabad, Gujarat, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

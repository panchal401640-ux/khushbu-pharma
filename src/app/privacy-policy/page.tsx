"use client";

import { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | Khushbu Pharma Machinery";
  }, []);

  return (
    <>
      <Breadcrumb
        title="Privacy Policy"
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            Last Updated: January 1, 2026
          </p>
          <p className="text-gray-600 mb-6">
            At Khushbu Pharma Machinery, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or engage with our services.
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Information Collection</h2>
              <p className="text-gray-600 mb-4">
                We may collect the following types of information when you interact with our website or services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Personal Information:</strong> Name, company name, job title, email address, phone number, and mailing address provided through contact forms, quote requests, or direct communications.</li>
                <li><strong>Business Information:</strong> Company registration details, industry type, and business requirements related to pharmaceutical machinery procurement.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, operating system, referral URLs, and pages visited on our website, collected automatically through standard web server logs and analytics tools.</li>
                <li><strong>Transaction Data:</strong> Records of products you have enquired about, quotations requested, and orders placed through our platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Use of Information</h2>
              <p className="text-gray-600 mb-4">
                The information we collect is used for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>To respond to your enquiries and provide quotations for pharmaceutical machinery and equipment.</li>
                <li>To process orders, manage deliveries, and provide after-sales support for our machinery.</li>
                <li>To communicate updates about our products, services, and industry developments relevant to the pharmaceutical sector.</li>
                <li>To improve our website functionality, product offerings, and customer experience.</li>
                <li>To comply with legal obligations and maintain proper business records.</li>
                <li>To send periodic newsletters and promotional materials, only with your explicit consent.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Trusted Service Providers:</strong> Third-party vendors who assist in operating our website, conducting business operations, or providing services to you, provided they agree to keep your information confidential.</li>
                <li><strong>Logistics Partners:</strong> Shipping and logistics companies engaged for the delivery of our machinery and spare parts to your designated location.</li>
                <li><strong>Legal Authorities:</strong> When required by law, regulation, or legal process, or to protect our rights, safety, or property.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement robust administrative, technical, and physical security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>SSL/TLS encryption for data transmitted through our website.</li>
                <li>Regular security assessments and system updates.</li>
                <li>Restricted access to personal information on a need-to-know basis.</li>
                <li>Secure storage facilities for any physical documentation.</li>
              </ul>
              <p className="text-gray-600 mt-4">
                While we strive to protect your information, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
              <p className="text-gray-600 mb-4">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you use our site and improve its performance.
              </p>
              <p className="text-gray-600 mb-4">
                We use the following types of cookies:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly, enabling core features such as form submissions and navigation.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand visitor behaviour, track pages visited, and measure website performance.</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences to provide a personalized experience.</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can control cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Third-Party Links</h2>
              <p className="text-gray-600 mb-4">
                Our website may contain links to third-party websites, including industry resources, partner sites, and regulatory bodies relevant to the pharmaceutical industry. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our website and services are intended for business professionals and are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take prompt steps to delete it from our records.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically to stay informed about how we are protecting your information. Your continued use of our website after any changes constitutes your acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 font-semibold">Khushbu Pharma Machinery</p>
                <p className="text-gray-600">Email: privacy@khushbupharmamachinery.com</p>
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

import React from 'react';
import { Helmet } from 'react-helmet';

const DataProtectionPolicy = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>Data Protection Policy | KAPSERFX IT SOLUTIONS EST</title>
      </Helmet>
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white uppercase tracking-widest border-b border-white/10 pb-8">
          Data Protection <span className="text-accent-cyan">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-gray-300">
          <p>Last Updated: June 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              KAPSERFX IT SOLUTIONS EST ("KAPSERFX IT SOLUTIONS EST", "we", "our", or "us") is committed to protecting the confidentiality, integrity, and security of personal and business information entrusted to us. This Data Protection Policy outlines how we collect, process, store, protect, and manage data in accordance with applicable data protection laws and industry best practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Scope</h2>
            <p>This policy applies to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Website visitors</li>
              <li>Prospective clients</li>
              <li>Existing clients</li>
              <li>Business partners</li>
              <li>Vendors and suppliers</li>
              <li>Employees and contractors where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data We May Collect</h2>
            <p>
              KAPSERFX IT SOLUTIONS EST may collect and process names, contact details, company information, email addresses, telephone numbers, business documentation, project-related information, technical usage data, and communication records. We collect only information necessary for legitimate business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Purpose of Data Processing</h2>
            <p>
              Information may be processed for client onboarding, service delivery, project management, customer support, business communications, legal compliance, fraud prevention, and website analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security Measures</h2>
            <p>
              KAPSERFX IT SOLUTIONS EST implements reasonable administrative, technical, and organizational safeguards to protect data against unauthorized access, loss, theft, misuse, disclosure, alteration, or destruction. Security measures may include access controls, encryption, secure hosting environments, and restricted access policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Subject Rights</h2>
            <p>
              Subject to applicable laws, individuals may request access to their personal information, correction of inaccurate information, deletion of personal information where legally permissible, restriction of processing, or withdrawal of consent.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataProtectionPolicy;

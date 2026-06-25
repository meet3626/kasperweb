import React from 'react';
import { Helmet } from 'react-helmet';

const DisclaimerPolicy = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>Disclaimer Policy | KAPSERFX IT SOLUTIONS EST</title>
      </Helmet>
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white uppercase tracking-widest border-b border-white/10 pb-8">
          Disclaimer <span className="text-accent-cyan">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-gray-300">
          <p>Last Updated: June 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. General Disclaimer</h2>
            <p>
              The information provided on this website is for general informational and business purposes only. 
              While KAPSERFX IT SOLUTIONS EST ("KAPSERFX IT SOLUTIONS EST") makes reasonable efforts to ensure the accuracy of the information presented, 
              we make no representations or warranties regarding the completeness, accuracy, reliability, or suitability of any content. 
              Any reliance placed on the information contained on this website is strictly at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. No Brokerage or Financial Services</h2>
            <p>
              KAPSERFX IT SOLUTIONS EST is a technology consulting and business services company. KAPSERFX IT SOLUTIONS EST does not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Operate a brokerage</li>
              <li>Provide trading services</li>
              <li>Offer investment advice</li>
              <li>Provide portfolio management services</li>
              <li>Manage client funds</li>
              <li>Accept deposits from retail clients</li>
              <li>Offer financial products or securities</li>
              <li>Execute trades on behalf of clients</li>
            </ul>
            <p className="mt-4">
              All services provided by KAPSERFX IT SOLUTIONS EST are business-to-business (B2B) services intended for businesses, licensed financial institutions, and corporate clients.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. No Legal, Financial, or Investment Advice</h2>
            <p>
              Information available on this website, including articles, guides, blogs, calculators, case studies, and educational materials, is provided solely for informational purposes and should not be considered legal, financial, regulatory, tax, investment, or professional advice. Users should obtain independent professional advice before making business, legal, regulatory, or financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Providers</h2>
            <p>
              KAPSERFX IT SOLUTIONS EST may introduce clients to third-party service providers, including technology vendors, hosting providers, payment solution providers, liquidity providers, software vendors, regulatory consultants, and other business partners. KAPSERFX IT SOLUTIONS EST is not responsible for the services, actions, performance, compliance, or obligations of any third-party provider. Any agreement entered into with a third party is solely between the client and the respective provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, KAPSERFX IT SOLUTIONS EST shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from use of this website, reliance on website content, or business decisions made by clients.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPolicy;

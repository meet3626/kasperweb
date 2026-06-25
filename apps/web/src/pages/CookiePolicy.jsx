import React from 'react';
import { Helmet } from 'react-helmet';

const CookiePolicy = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>Cookie Policy | KAPSERFX IT SOLUTIONS EST</title>
      </Helmet>
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white uppercase tracking-widest border-b border-white/10 pb-8">
          Cookie <span className="text-accent-cyan">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-gray-300">
          <p>Last Updated: June 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              This Cookie Policy explains how KAPSERFX IT SOLUTIONS EST ("KAPSERFX IT SOLUTIONS EST", "we", "our", or "us") uses cookies and similar technologies when you visit our website. By continuing to use our website, you consent to the use of cookies in accordance with this Cookie Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help improve website functionality, enhance user experience, analyze website traffic, and support security measures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-4 mt-4">
              <li><strong>Essential Cookies:</strong> Necessary for the operation of our website and enable core functionality such as page navigation, security, and form submissions.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information such as page visits, traffic sources, and user behavior.</li>
              <li><strong>Performance Cookies:</strong> Improve website performance and user experience by monitoring functionality and identifying technical issues.</li>
              <li><strong>Marketing Cookies:</strong> Used to measure the effectiveness of marketing campaigns and improve advertising relevance through platforms such as Google, Meta, LinkedIn, and other marketing tools.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Cookies</h2>
            <p>
              We may use third-party services that place cookies on your device, including Google Analytics, Google Ads, Meta (Facebook & Instagram), LinkedIn Insight Tag, and YouTube. These providers may collect information in accordance with their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Managing Cookies</h2>
            <p>
              Most web browsers allow users to control, block, or delete cookies through browser settings. Please note that disabling certain cookies may affect the functionality and performance of the website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "KAPSERFX | Expert Forex Broker Solutions", 
  description = "Turnkey Forex Brokerage solutions, trading platforms, licensing, CRM, and digital marketing strategies by KAPSERFX IT SOLUTIONS EST.", 
  keywords = "Forex Broker, Turnkey Solutions, MT5, cTrader, Forex Licensing, Crypto Broker, Trading Platform",
  image = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
  url = "https://kapserfx.com",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema for B2B Financial Services SEO */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "KAPSERFX IT SOLUTIONS EST",
            "alternateName": "KAPSERFX Turnkey Brokerage Solutions",
            "url": "https://www.kapserfx.com",
            "logo": "https://www.kapserfx.com/logo.png",
            "description": "Premium B2B Fintech provider specializing in turnkey Forex broker solutions, MT5/cTrader white-label platforms, Tier-1 liquidity integration, and global regulatory compliance.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dubai",
              "addressRegion": "Dubai",
              "addressCountry": "AE"
            },
            "areaServed": "Worldwide",
            "telephone": "+971-55-1234567",
            "email": "contact@kapserfx.com",
            "sameAs": [
              "https://www.linkedin.com/company/kapserfx",
              "https://twitter.com/kapserfx"
            ],
            "priceRange": "$$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "128"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "White Label Trading Platforms",
                "description": "Deployment of MT5 and cTrader white-label terminals for institutional brokers.",
                "category": "Software as a Service (SaaS)"
              },
              {
                "@type": "Offer",
                "name": "Forex Liquidity Bridging",
                "description": "Integration of Tier-1 liquidity via FIX API and Centroid infrastructure.",
                "category": "Financial Technology"
              },
              {
                "@type": "Offer",
                "name": "Brokerage Regulatory Compliance",
                "description": "Corporate structuring and licensing acquisition in jurisdictions like Dubai, Cyprus, and Mauritius.",
                "category": "Financial Consulting"
              }
            ]
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEOHead;

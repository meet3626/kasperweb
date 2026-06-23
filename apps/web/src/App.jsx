import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import WhatsAppButton from '@/components/WhatsAppButton';
import { AnimatePresence } from 'framer-motion';

// Lazy loading pages for massive performance boost
const Home = React.lazy(() => import('@/pages/Home'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const Project = React.lazy(() => import('@/pages/Project'));
const BrokerSetupCalculator = React.lazy(() => import('@/pages/BrokerSetupCalculator'));
const AboutUs = React.lazy(() => import('@/pages/AboutUs'));
const Blog = React.lazy(() => import('@/pages/Blog'));
const BlogPost = React.lazy(() => import('@/pages/BlogPost'));
const PrivacyPolicy = React.lazy(() => import('@/pages/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('@/pages/TermsAndConditions'));
const DisclaimerPolicy = React.lazy(() => import('@/pages/DisclaimerPolicy'));
const CookiePolicy = React.lazy(() => import('@/pages/CookiePolicy'));
const RefundPolicy = React.lazy(() => import('@/pages/RefundPolicy'));
const AMLPolicy = React.lazy(() => import('@/pages/AMLPolicy'));
const DataProtectionPolicy = React.lazy(() => import('@/pages/DataProtectionPolicy'));
const ServiceDetail = React.lazy(() => import('@/pages/ServiceDetail'));
const AdminLogin = React.lazy(() => import('@/pages/Admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('@/pages/Admin/AdminDashboard'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function MaintenanceMode() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Under Maintenance</h1>
      <p className="text-xl text-muted-foreground max-w-lg mb-8">
        We are currently upgrading our systems to serve you better. Please check back shortly.
      </p>
      <div className="w-16 h-16 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    // Check maintenance mode, but allow access to admin paths
    const mode = localStorage.getItem('maintenanceMode');
    if (mode === 'Enable' && !location.pathname.startsWith('/admin')) {
      setIsMaintenance(true);
    } else {
      setIsMaintenance(false);
    }
  }, [location.pathname]);

  if (isMaintenance) {
    return <MaintenanceMode />;
  }

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            {/* Admin Routes (Without Main Layout) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Public Routes (With Main Layout) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="calculator" element={<BrokerSetupCalculator />} />
              <Route path="brokerage-calculator" element={<BrokerSetupCalculator />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="project/:projectId" element={<Project />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="disclaimer" element={<DisclaimerPolicy />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
              <Route path="refund-policy" element={<RefundPolicy />} />
              <Route path="aml-policy" element={<AMLPolicy />} />
              <Route path="data-protection-policy" element={<DataProtectionPolicy />} />
              <Route path="services/:serviceId" element={<ServiceDetail />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
      {!isAdminRoute && <WhatsAppButton />}
    </>
  );
}

export default App;
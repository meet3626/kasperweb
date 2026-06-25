import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Canvas } from '@react-three/fiber';
import Global3DScene from '@/components/Global3DScene';

const Layout = () => {
  return (
    <>
      <div className="home-scroll-container min-h-screen bg-[#0B0B0B] text-white overflow-x-hidden flex flex-col relative">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <Global3DScene />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="relative z-10 w-full flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default Layout;
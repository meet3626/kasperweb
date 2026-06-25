import React from 'react';
import { motion } from 'framer-motion';

const AboutKAPSERFX = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated subtle grid background */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <p className="section-label mb-4">Our Heritage</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[800] text-white leading-[1.1] tracking-tight mb-6 uppercase">
              About <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">KAPSERFX</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent-cyan to-transparent rounded-full mb-8" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Forged at the intersection of institutional finance and next-generation technology, KAPSERFX was established with a singular mandate: to engineer uncompromised, institutional-grade brokerage infrastructure. Our heritage is rooted in delivering ultra-low latency environments and deep liquidity solutions that power the world's most demanding retail and institutional trading floors.
            </p>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              We operate a multi-regulated ecosystem infrastructure that bridges the gap between regulatory complexities and operational dominance. By orchestrating everything from tier-1 liquidity provision and MT5 deployment to seamless CRM integration, we insulate our clients from the systemic risks and capital bleed typically associated with fragmented brokerage launches.
            </p>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              With a strategic footprint spanning major financial hubs including <span className="text-white font-semibold">Dubai, Cyprus, and Singapore</span>, our commitment is global. We empower visionary enterprises to rapidly deploy turnkey brokerages that are pre-cleared for compliance, engineered for scale, and designed to capture immediate market share in a highly competitive digital economy.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutKAPSERFX;

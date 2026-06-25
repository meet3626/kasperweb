import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { step: '01', title: 'Corporate Structuring: Rapid offshore/onshore entity formation.' },
  { step: '02', title: 'Institutional Banking: Securing high-tier fiat processing.' },
  { step: '03', title: 'Regulatory Licensing: Fast-tracked compliance frameworks.' },
  { step: '04', title: 'Infrastructure Deployment: Standing up ultra-low latency servers.' },
  { step: '05', title: 'Tier-1 Liquidity Bridging: Integrating zero-delay FIX APIs.' },
  { step: '06', title: 'CRM & Back-Office Sync: Deploying automated client management.' },
  { step: '07', title: 'Payment Gateway Integration: Enabling global crypto/fiat deposits.' },
  { step: '08', title: 'Web Platform Launch: Rolling out conversion-optimized portals.' },
  { step: '09', title: 'Operational Training: Equipping your team with advanced system protocols.' },
  { step: '10', title: 'Acquisition Strategy: Executing aggressive digital growth blueprints.' },
  { step: '11', title: 'Beta Testing: Rigorous stress-testing of execution speeds.' },
  { step: '12', title: 'Global Rollout: Going live with institutional readiness.' },
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-28 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Your Path to Market
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">Roadmap</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            A fragmented launch guarantees regulatory friction and capital bleed. Our 12-step institutional blueprint engineers your brokerage for zero-delay deployment, ensuring uncompromised compliance and immediate operational dominance.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-accent-cyan via-accent-purple to-transparent hidden md:block"
          ></motion.div>
          
          <div className="space-y-12">
            {steps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''} group`}
                >
                  <div className="md:w-5/12"></div>
                  
                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="z-10 flex items-center justify-center w-12 h-12 bg-[#121620] border-2 border-accent-cyan rounded-full shrink-0 my-4 md:my-0 pulse-glow group-hover:bg-accent-cyan transition-all duration-300"
                  >
                    <span className="text-white font-bold text-sm group-hover:text-black transition-colors duration-300">{item.step}</span>
                  </motion.div>
                  
                  {/* Content Box */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`md:w-5/12 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] p-6 rounded-xl group-hover:border-accent-cyan/40 transition-all duration-300 w-full text-center ${isEven ? 'md:text-left' : 'md:text-right'} relative overflow-hidden`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent-cyan/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="text-base font-semibold text-white relative z-10 leading-snug group-hover:text-accent-cyan transition-colors duration-300">{item.title}</h3>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Roadmap;

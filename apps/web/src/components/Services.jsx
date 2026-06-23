import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Users, LineChart, Shield, Server, Briefcase, ArrowUpRight } from 'lucide-react';

const servicesData = [
  { icon: LineChart, title: 'Multi-Asset Liquidity', desc: 'Connect your brokerage to deep Tier-1 liquidity pools offering 80+ FX pairs, Commodities, and Crypto CFDs with aggregated feeds and tight institutional spreads.', span: 'lg:col-span-2 md:col-span-2', bgStyle: 'bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 dark:to-transparent border-black/10 dark:border-white/10 hover:border-accent-cyan/40' },
  { icon: Monitor, title: 'White-Label MT5 Platform', desc: 'Deploy a fully branded MT5 trading environment complete with advanced admin controls.', span: 'lg:col-span-1 md:col-span-1', bgStyle: 'bg-gradient-to-br from-accent-cyan/10 to-transparent border-accent-cyan/20 hover:border-accent-cyan/50' },
  { icon: Users, title: 'Branded CRM & Portal', desc: 'Streamline back-office operations with an intelligent portal featuring automated KYC/AML onboarding.', span: 'lg:col-span-1 md:col-span-1', bgStyle: 'bg-white/50 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 hover:border-accent-purple/50' },
  { icon: Server, title: 'Ultra-Low Latency VPS', desc: 'Provide your traders with sub-millisecond execution speeds via our globally distributed, co-located servers.', span: 'lg:col-span-2 md:col-span-2', bgStyle: 'bg-gradient-to-bl from-black/5 to-transparent dark:from-white/5 dark:to-transparent border-black/10 dark:border-white/10 hover:border-accent-blue/40' },
  { icon: Shield, title: 'Risk Management', desc: 'Safeguard your brokerage with sophisticated bridging and real-time exposure monitoring to mitigate toxic flow.', span: 'lg:col-span-1.5 md:col-span-1', bgStyle: 'bg-white dark:bg-[#111621] border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20' },
  { icon: Briefcase, title: 'Islamic Compliance Setup', desc: 'Expand your regional market share by easily configuring swap-free, Sharia-compliant trading accounts for your clients without complex administrative overhead.', span: 'lg:col-span-2 md:col-span-2', bgStyle: 'bg-gradient-to-t from-accent-purple/10 to-transparent border-accent-purple/20 hover:border-accent-purple/50' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-[#09090b] transition-colors duration-500 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-accent-cyan/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full text-xs font-semibold uppercase tracking-widest text-accent-cyan mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></div>
              Turnkey Solutions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight"
            >
              Complete Brokerage <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-500 dark:to-gray-200 italic font-light">Infrastructure</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md pb-2"
          >
            Launch and scale your brand with our comprehensive suite of B2B technology, Tier-1 liquidity, and operational management tools.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            // Fix span for item 4 since we use 3 columns
            let spanClass = service.span;
            if (index === 4) spanClass = 'lg:col-span-1 md:col-span-1';

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group p-8 md:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden flex flex-col justify-between ${spanClass} ${service.bgStyle}`}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white backdrop-blur-md group-hover:scale-110 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-500">
                    <Icon size={24} className="group-hover:text-accent-cyan transition-colors" />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 group-hover:bg-black/5 dark:group-hover:bg-white/5 text-gray-900 dark:text-white">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-accent-cyan transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm md:text-base">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Target, ShieldCheck, Globe2, Clock, Lock } from 'lucide-react';

const offers = [
  {
    title: 'Competitive Spreads from 0.0 Pips',
    description: 'Access raw interbank spreads with no dealing-desk intervention. Transparent pricing with full visibility on every trade.',
    icon: Target,
    color: 'text-accent-cyan',
    image: '/features_spreads_1782110651999.png'
  },
  {
    title: 'MetaTrader 5 — Full Suite',
    description: 'Trade on the world\'s most powerful platform. 100+ indicators, automated EAs, mobile app, and web terminal included.',
    icon: Zap,
    color: 'text-accent-purple',
    image: '/features_metatrader_1782110668532.png'
  },
  {
    title: 'Instant Order Execution (0.01s)',
    description: 'Lightning-fast NDD execution with servers co-located near major liquidity hubs. No requotes, no slippage surprises.',
    icon: Clock,
    color: 'text-blue-500',
    image: '/features_execution_1782110683855.png'
  },
  {
    title: 'Tier-1 Institutional Liquidity',
    description: 'Deep order books sourced from leading global banks and Prime-of-Prime providers ensuring tight spreads in all conditions.',
    icon: Globe2,
    color: 'text-accent-cyan',
    image: '/features_liquidity_1782110708030.png'
  },
  {
    title: '24/7 Multilingual Support',
    description: 'Dedicated account managers available round the clock via live chat, email, and WhatsApp in multiple languages.',
    icon: CheckCircle2,
    color: 'text-accent-purple',
    image: '/features_support_1782110724141.png'
  },
  {
    title: 'Segregated Client Funds',
    description: 'Your capital is held in fully segregated tier-1 bank accounts, protected from company operational activity at all times.',
    icon: ShieldCheck,
    color: 'text-blue-500',
    image: '/features_security_1782110744431.png'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden transition-colors duration-500">
      {/* Background Glows */}
      <div className="absolute top-[30%] left-[-20%] w-[1000px] h-[1000px] bg-accent-cyan/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-20%] w-[800px] h-[800px] bg-accent-purple/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full text-xs font-semibold uppercase tracking-widest text-accent-purple mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse"></div>
            Why Choose Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight"
          >
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple italic font-light">Offer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light"
          >
            A comprehensive suite of solutions tailored to launch, scale, and optimize your Forex brokerage operations.
          </motion.p>
        </div>

        <div className="space-y-20 md:space-y-24 max-w-5xl mx-auto">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col gap-8 lg:gap-16 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                  <div className="aspect-[4/3] rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md flex items-center justify-center relative overflow-hidden group-hover:border-accent-cyan/30 transition-colors duration-500">
                    {/* Background Image */}
                    <motion.div 
                      className="absolute inset-0 z-0 bg-cover bg-center mix-blend-multiply dark:mix-blend-screen opacity-30 dark:opacity-50 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity duration-700"
                      style={{ backgroundImage: `url(${offer.image})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 dark:from-[#050505]/80 dark:via-[#050505]/40 to-transparent z-1"></div>
                    
                    {/* Icon */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: isEven ? 5 : -5 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-xl relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-accent-cyan/40 transition-colors duration-500"
                    >
                      <Icon size={40} strokeWidth={1.5} className={`${offer.color} opacity-90`} />
                    </motion.div>
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl md:text-5xl font-bold text-black/5 dark:text-white/5">{String(index + 1).padStart(2, '0')}</span>
                    <div className="w-12 h-[1px] bg-black/20 dark:bg-white/20"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight group-hover:text-accent-cyan transition-colors duration-300">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed mb-6">
                    {offer.description}
                  </p>
                  <button className="flex items-center gap-3 text-gray-900 dark:text-white font-semibold text-sm tracking-widest uppercase group/btn w-fit">
                    <span className="group-hover/btn:text-accent-cyan transition-colors duration-300">Discover</span>
                    <span className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center group-hover/btn:bg-accent-cyan group-hover/btn:border-accent-cyan transition-all duration-300 group-hover/btn:translate-x-2">
                      <ArrowRight size={14} className="group-hover/btn:text-white" />
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ParticleNetwork from '@/components/ParticleNetwork';
import { useTranslation } from 'react-i18next';

// Floating animated stat card used in the side panel
const FloatingCard = ({ icon: Icon, label, value, color, delay, className, tooltipText }) => (
  <motion.div
    initial={{ opacity: 0, x: 40, y: 20 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute bg-white/90 dark:bg-[#141820]/90 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-2xl group cursor-default hover:border-black/30 dark:hover:border-white/30 transition-colors duration-300 ${className}`}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={18} className="text-white" />
    </div>
    <div>
      <p className="text-gray-900 dark:text-white font-bold text-lg leading-none">{value}</p>
      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 tracking-wide">{label}</p>
    </div>

    {/* Tooltip */}
    {tooltipText && (
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-14 transition-all duration-300 pointer-events-none z-50">
        <div className="bg-gray-100 dark:bg-neutral-800 border border-black/10 dark:border-white/20 text-gray-800 dark:text-gray-200 text-[11px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
          {tooltipText}
        </div>
        {/* Tooltip arrow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-100 dark:bg-neutral-800 border-b border-r border-black/10 dark:border-white/20 rotate-45" />
      </div>
    )}
  </motion.div>
);

// Animated trading chart bars
const ChartBar = ({ height, delay, active }) => (
  <motion.div
    className={`w-5 rounded-t-sm ${active ? 'bg-gradient-to-t from-accent-cyan to-accent-cyan/50' : 'bg-black/5 dark:bg-white/10'}`}
    initial={{ height: 0 }}
    animate={{ height }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  />
);

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleCTAClick = () => navigate('/contact');
  const handleViewWorkClick = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const bars = [
    { height: 40, active: false },
    { height: 65, active: false },
    { height: 50, active: true },
    { height: 80, active: true },
    { height: 55, active: false },
    { height: 95, active: true },
    { height: 70, active: false },
    { height: 110, active: true },
    { height: 85, active: true },
    { height: 120, active: true },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gray-50 dark:bg-[#0B0B0B] transition-colors duration-500">
      <ParticleNetwork />

      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#0B0B0B] dark:via-[#0d0d14] dark:to-[#0B0B0B] z-0 transition-colors duration-500" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-purple/[0.07] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-accent-cyan/[0.05] rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">

          {/* ── LEFT: Copy ──────────────────────────────── */}
          <div className="flex flex-col justify-center">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 rounded-full mb-8 w-fit hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.07] dark:hover:bg-white/[0.07] transition-all duration-300 cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
              <span className="text-[11px] text-gray-600 dark:text-gray-300 uppercase tracking-[0.2em] font-semibold">
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-[800] text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6"
            >
              {t('hero.headingLine1')}{' '}
              <br className="hidden md:block" />
              {t('hero.headingLine2')}{' '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
                {t('hero.headingAccent')}
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base text-gray-600 dark:text-gray-400 max-w-xl mb-10 font-light leading-relaxed"
            >
              {t('hero.subheading')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={handleCTAClick}
                size="lg"
                className="bg-gray-900 text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 font-[800] px-8 py-6 text-sm rounded-full group uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight className="ml-2.5 text-white dark:text-black group-hover:translate-x-1.5 transition-transform duration-300" size={16} />
              </Button>
              <Button
                onClick={handleViewWorkClick}
                size="lg"
                variant="outline"
                className="border-2 border-black/20 dark:border-white/20 hover:bg-black/[0.03] dark:hover:bg-white/[0.07] hover:border-accent-cyan/50 dark:hover:border-accent-cyan/50 text-gray-900 dark:text-white px-8 py-6 text-sm rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
              >
                {t('hero.ctaSecondary')}
              </Button>
            </motion.div>

            {/* Stat Strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-black/[0.06] dark:border-white/[0.06] grid grid-cols-3 gap-6 max-w-sm"
            >
              {[{ value: t('hero.stat1Value'), label: t('hero.stat1Label') }, { value: t('hero.stat2Value'), label: t('hero.stat2Label') }, { value: t('hero.stat3Value'), label: t('hero.stat3Label') }].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-[800] text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">{stat.value}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Animated Visual Panel ──────────── */}
          <div className="relative hidden lg:flex items-center justify-center h-[520px]">

            {/* Central glowing orb / card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-72 h-72 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-[#141820] dark:to-[#0d1018] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 opacity-60" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-cyan/20 rounded-full blur-2xl" />

              {/* Chart bars */}
              <div className="relative z-10 flex items-end gap-1.5 px-6 mb-4">
                {bars.map((bar, i) => (
                  <ChartBar key={i} height={bar.height} active={bar.active} delay={0.6 + i * 0.06} />
                ))}
              </div>

              {/* Live indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="relative z-10 flex items-center gap-2 px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full"
              >
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-accent-cyan rounded-full"
                />
                <span className="text-accent-cyan text-xs font-bold uppercase tracking-widest">{t('hero.liveMarkets')}</span>
              </motion.div>
            </motion.div>

            {/* Floating stat cards */}
            <FloatingCard
              icon={TrendingUp}
              label="Execution Speed"
              value="<1ms"
              color="bg-gradient-to-br from-accent-cyan to-accent-cyan/50"
              delay={0.8}
              className="-top-4 -left-8"
              tooltipText="Co-located servers in London LD4 & New York NY4"
            />
            <FloatingCard
              icon={Shield}
              label="License Ready"
              value="FSC · CySEC"
              color="bg-gradient-to-br from-accent-purple to-accent-purple/50"
              delay={1.0}
              className="-bottom-4 -left-4"
              tooltipText="Pre-cleared regulatory frameworks & corporate structuring"
            />
            <FloatingCard
              icon={Zap}
              label="Tier-1 Liquidity"
              value="Deep Books"
              color="bg-gradient-to-br from-orange-500 to-orange-500/50"
              delay={1.2}
              className="top-16 -right-8"
              tooltipText="Direct market access to Top-Tier Prime of Primes"
            />

            {/* Rotating orbital ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-black/[0.06] dark:border-white/[0.06] pointer-events-none"
              style={{ margin: '20px' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-accent-cyan/[0.08] pointer-events-none"
              style={{ margin: '50px' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 border-2 border-black/20 dark:border-white/20 rounded-full flex items-start justify-center p-1.5 hover:border-black/40 dark:hover:border-white/40 transition-colors duration-300"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1 bg-accent-cyan rounded-full opacity-70"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
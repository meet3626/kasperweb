import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Globe, ChevronDown,
  Briefcase, FileCheck, Server, Zap, CreditCard,
  LayoutDashboard, ShieldAlert, Monitor, PuzzleIcon,
  TrendingUp, GraduationCap, ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/ThemeToggle';

// ─── Language Data ─────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'EN', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'AR', label: 'العربية', flag: '🇦🇪', dir: 'ltr' },
  { code: 'ES', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'FR', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ZH', label: '中文', flag: '🇨🇳', dir: 'ltr' },
];

// ─── Mega-Menu Data ────────────────────────────────────────────────────────────
const MEGA_MENU = [
  {
    column: 'Broker Setup',
    accent: 'from-accent-cyan/20 to-transparent',
    dot: 'bg-accent-cyan',
    items: [
      { icon: Briefcase, label: 'Business Consulting', desc: 'End-to-end brokerage strategy & advisory', href: '/services/business-consulting' },
      { icon: FileCheck, label: 'Licensing & Regulations', desc: 'Multi-jurisdiction regulatory frameworks', href: '/services/licensing-regulations' },
      { icon: Server, label: 'Hosting Server Support', desc: 'Ultra-low latency co-location infrastructure', href: '/services/hosting-server-support' },
      { icon: Zap, label: 'Liquidity Provider', desc: 'Tier-1 deep order-book connections', href: '/services/liquidity-provider' },
      { icon: CreditCard, label: 'Gateway Solutions', desc: 'Multi-currency payment processing', href: '/services/gateway-solutions' },
    ],
  },
  {
    column: 'Tech Solutions',
    accent: 'from-accent-purple/20 to-transparent',
    dot: 'bg-accent-purple',
    items: [
      { icon: LayoutDashboard, label: 'CRM Software', desc: 'Intelligent client lifecycle management', href: '/services/crm-software' },
      { icon: ShieldAlert, label: 'Risk Management Software', desc: 'Real-time exposure & drawdown control', href: '/services/risk-management-software' },
      { icon: Monitor, label: 'Trading Platforms', desc: 'MT5, cTrader & custom white-label builds', href: '/services/trading-platforms' },
      { icon: PuzzleIcon, label: 'Plugin Solutions', desc: 'Proprietary performance-enhancing plugins', href: '/services/plugin-solutions' },
    ],
  },
  {
    column: 'Growth Support',
    accent: 'from-emerald-500/20 to-transparent',
    dot: 'bg-emerald-400',
    items: [
      { icon: TrendingUp, label: 'Digital Growth Solutions', desc: 'Data-driven acquisition & retention funnels', href: '/services/digital-growth-solutions' },
      { icon: GraduationCap, label: 'Technical Training', desc: 'Platform, compliance & operations training', href: '/services/technical-training' },
    ],
  },
];

// ─── Language Selector ─────────────────────────────────────────────────────────
const LanguageSelector = ({ mobile = false }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(LANGUAGES[0]);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (lang) => {
    setActive(lang);
    setIsOpen(false);
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.code.toLowerCase();
    i18n.changeLanguage(lang.code.toLowerCase());
    
    // Programmatically trigger Google Translate
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      let targetCode = lang.code.toLowerCase();
      if (lang.code === 'ZH') targetCode = 'zh-CN';
      selectElement.value = targetCode;
      selectElement.dispatchEvent(new Event('change'));
    }
  };

  if (mobile) {
    return (
      <div className="w-full">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">{t('nav.language')}</p>
        <div className="grid grid-cols-5 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${active.code === lang.code
                ? 'bg-accent-cyan/20 border border-accent-cyan/50'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${active.code === lang.code ? 'text-accent-cyan' : 'text-gray-400'}`}>
                {lang.code}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all duration-300 text-sm font-semibold uppercase tracking-widest group ${isOpen ? 'bg-accent-cyan/10 border-accent-cyan/40 text-accent-cyan' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white'
          }`}
      >
        <Globe size={14} className={`transition-colors ${isOpen ? 'text-accent-cyan' : 'text-gray-400 group-hover:text-white'}`} />
        <span>{active.code}</span>
        <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-cyan' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-2 w-52 z-50 rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-2 border-b border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold">Select Language</p>
            </div>
            <div className="p-2">
              {LANGUAGES.map((lang, i) => {
                const isActive = active.code === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleSelect(lang)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-accent-cyan/15 text-accent-cyan' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span className="text-xl w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-semibold leading-none ${isActive ? 'text-accent-cyan' : ''}`}>{lang.label}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest">{lang.code}</p>
                    </div>
                    {isActive && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />}
                  </motion.button>
                );
              })}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Mega Menu Component ───────────────────────────────────────────────────────
const MegaMenu = ({ isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[860px] z-50 rounded-2xl border border-white/[0.08] bg-[#0a0c12]/95 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Top glow hairline */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

        <div className="grid grid-cols-3 divide-x divide-white/[0.06] p-6 gap-0">
          {MEGA_MENU.map((col, ci) => (
            <div key={col.column} className={`${ci > 0 ? 'pl-6' : ''} ${ci < MEGA_MENU.length - 1 ? 'pr-6' : ''}`}>
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                <span className={`w-1.5 h-1.5 rounded-full ${col.dot} shrink-0`} />
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{col.column}</p>
              </div>

              {/* Items */}
              <div className="space-y-0.5">
                {col.items.map((item, ii) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: ci * 0.05 + ii * 0.04, duration: 0.25 }}
                    >
                      <Link
                        to={item.href}
                        className="group flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08]"
                      >
                        {/* Icon bubble */}
                        <div className="relative w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden transition-all duration-500 group-hover:border-accent-cyan/40 group-hover:bg-accent-cyan/[0.05] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.15)_inset]">
                          {/* Animated flare */}
                          <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                          <Icon size={18} strokeWidth={1.5} className="text-gray-400 group-hover:text-accent-cyan group-hover:scale-110 transition-all duration-300 relative z-10" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-200 leading-tight">
                              {item.label}
                            </p>
                            <ArrowUpRight
                              size={11}
                              className="text-gray-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent-cyan transition-all duration-200"
                            />
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5 leading-snug group-hover:text-gray-400 transition-colors duration-200">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="border-t border-white/[0.06] px-6 py-4 bg-white/[0.015] flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">Not sure where to start?</p>
            <p className="text-[11px] text-gray-600">Our experts will design a solution around your exact needs.</p>
          </div>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs font-bold uppercase tracking-widest hover:bg-accent-cyan/20 hover:border-accent-cyan/50 transition-all duration-200 group"
          >
            Book a Call
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Bottom glow */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Main Header ───────────────────────────────────────────────────────────────
const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const megaTimeout = useRef(null);
  const navigate = useNavigate();

  const navLinks = [];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Delay-tuned hover — prevents accidental flicker
  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const [path, id] = href.split('#');
    if (path === '/' && id) {
      navigate(path);
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
      navigate(href);
    }
    if (isOpen) setIsOpen(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isOpen) setIsOpen(false);
  };

  const handleCTA = () => {
    navigate('/contact');
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <motion.header
          className={`pointer-events-auto transition-all duration-500 ease-[0.22,1,0.36,1] w-full ${isScrolled
            ? 'bg-[#09090b]/90 backdrop-blur-2xl border-b border-white/10 shadow-lg py-3'
            : 'bg-transparent py-5'
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center w-full">

            {/* Logo */}
            <Link to="/" onClick={handleHomeClick} className="text-xl md:text-2xl font-[800] text-white tracking-widest flex items-center gap-2 shrink-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">KAPSERFX</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">

              <Link to="/" onClick={handleHomeClick} className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-widest text-sm">
                {'HOME'}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* ── Services with Mega Menu ── */}
              <div
                className="relative"
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleMegaLeave}
              >
                <button
                  className={`flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest transition-colors duration-200 py-7 ${megaOpen ? 'text-accent-cyan' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {t('nav.services')}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${megaOpen ? 'rotate-180 text-accent-cyan' : ''}`}
                  />
                </button>
                <MegaMenu isOpen={megaOpen} />
              </div>

              {/* Company Dropdown */}
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors font-semibold uppercase tracking-widest text-sm flex items-center gap-1 py-7">
                  {t('nav.company')}
                  <ChevronDown size={13} className="transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                  <Link to="/about-us" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">{t('nav.about')}</Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">{t('nav.contact')}</Link>
                  <a href="/#faq" onClick={handleSmoothScroll} className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5">{t('nav.faq')}</a>
                </div>
              </div>

              <Link to="/blog" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-widest text-sm">
                {t('nav.blog')}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link to="/brokerage-calculator" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-widest text-sm">
                {t('nav.calculator')}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            </nav>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative flex flex-col items-end">
                <LanguageSelector />

              </div>
              <Button
                className="bg-white text-black hover:bg-gray-100 group rounded-full font-bold px-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                onClick={handleCTA}
              >
                {t('nav.getStarted')}
                <ArrowRight className="ml-2 h-4 w-4 text-black transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white p-1">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#0B0B0B] z-50 md:hidden overflow-y-auto"
          >
            <div className="container mx-auto px-6 flex flex-col min-h-full">

              {/* Mobile Header Row */}
              <div className="flex justify-between items-center h-20 shrink-0">
                <Link to="/" onClick={handleHomeClick} className="text-2xl font-bold text-white tracking-wider">
                  <span className="text-accent-cyan">KAPSERFX</span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="text-white p-1"><X size={28} /></button>
              </div>

              {/* Mobile Nav */}
              <nav className="flex-grow flex flex-col justify-center items-center gap-6 py-8">

                <motion.a
                  href="/"
                  onClick={handleHomeClick}
                  className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  {'HOME'}
                </motion.a>

                {/* Mobile Services Accordion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="w-full max-w-xs"
                >
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="w-full flex items-center justify-between text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    {t('nav.services')}
                    <ChevronDown size={20} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-accent-cyan' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 space-y-4 pl-3 border-l border-white/10">
                          {MEGA_MENU.map((col) => (
                            <div key={col.column}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{col.column}</p>
                              </div>
                              {col.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.label}
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 py-2 group"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent-cyan/30 group-hover:bg-accent-cyan/10 transition-all duration-300">
                                      <Icon size={14} className="text-gray-500 group-hover:text-accent-cyan group-hover:scale-110 transition-all duration-300" />
                                    </div>
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">{item.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.38 }}
                  className="flex flex-col items-center gap-3 w-full max-w-xs"
                >
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2 w-1/2 text-center">{t('nav.company')}</span>
                  <Link to="/about-us" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">{t('nav.about')}</Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">{t('nav.contact')}</Link>
                  <a href="/#faq" onClick={handleSmoothScroll} className="text-xl font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">{t('nav.faq')}</a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.46 }}
                  className="flex flex-col items-center gap-4"
                >
                  <Link to="/blog" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">{t('nav.blog')}</Link>
                  <Link to="/brokerage-calculator" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">{t('nav.calculator')}</Link>
                </motion.div>

                {/* Mobile Language & Theme */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.52 }}
                  className="w-full max-w-xs mt-2 flex flex-col gap-4 items-center"
                >
                  <LanguageSelector mobile />
                </motion.div>
              </nav>

              {/* Mobile CTA */}
              <div className="py-8 shrink-0">
                <Button
                  className="bg-white text-black hover:bg-gray-200 group w-full text-lg py-6 rounded-full font-bold uppercase tracking-widest"
                  onClick={handleCTA}
                >
                  {t('nav.getStarted')}
                  <ArrowRight className="ml-2 h-4 w-4 text-black transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
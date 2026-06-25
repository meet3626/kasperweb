import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfitEstimator = () => {
  const navigate = useNavigate();
  // Volume in Millions ($M)
  const [volumeM, setVolumeM] = useState(500);
  // Active Traders
  const [traders, setTraders] = useState(1500);
  // Spread in Pips
  const [spread, setSpread] = useState(1.2);

  // Constants
  const techFee = 5000;
  
  // Calculations
  // 1 Lot = $100,000. 
  // If Volume is $500M, that is 5,000 Lots.
  // 1 Pip on 1 Lot = $10.
  // Revenue = (Lots) * (Spread in Pips) * ($10 per pip)
  const lots = (volumeM * 1000000) / 100000;
  const revenue = lots * spread * 10;
  const roi = Math.round((revenue / techFee) * 100); // ROI percentage

  // Format currency
  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent-cyan/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent-cyan/[0.05] border border-accent-cyan/20 rounded-full mb-6"
          >
            <Calculator className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs text-accent-cyan font-bold uppercase tracking-widest">Interactive Calculator</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-[800] text-white mb-4"
          >
            Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">Profit Potential</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            See how our institutional-grade infrastructure and tier-1 liquidity can instantly scale your margins.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#121620]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        >
          {/* LEFT: INPUT CONSOLE */}
          <div className="lg:w-1/2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <div className="w-2 h-6 bg-accent-cyan rounded-full" />
              Input Console
            </h3>

            <div className="space-y-10">
              {/* Volume Slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Target Monthly Volume</label>
                  <span className="text-2xl font-bold text-white">${volumeM}M</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="5000" 
                  step="10" 
                  value={volumeM} 
                  onChange={(e) => setVolumeM(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-cyan"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                  <span>$10M</span>
                  <span>$5B+</span>
                </div>
              </div>

              {/* Traders Slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Active Traders</label>
                  <span className="text-2xl font-bold text-white">{traders.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="10000" 
                  step="50" 
                  value={traders} 
                  onChange={(e) => setTraders(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-purple"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                  <span>50</span>
                  <span>10k+</span>
                </div>
              </div>

              {/* Spread Slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Avg. Spread Markup (Pips)</label>
                  <span className="text-2xl font-bold text-white">{spread.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="3.0" 
                  step="0.1" 
                  value={spread} 
                  onChange={(e) => setSpread(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-cyan"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                  <span>0.1</span>
                  <span>3.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PROJECTION MATRIX */}
          <div className="lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden flex flex-col justify-center">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl" />
            
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 relative z-10">
              <div className="w-2 h-6 bg-accent-purple rounded-full" />
              Projection Matrix
            </h3>

            <div className="space-y-8 relative z-10">
              {/* Tech Fee */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-2">Estimated Tech Fee</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-[800] text-white">{formatCurrency(techFee)}</span>
                  <span className="text-gray-500 font-medium">/ mo</span>
                </div>
              </div>

              {/* Revenue Projection */}
              <div className="bg-gradient-to-br from-accent-cyan/[0.08] to-transparent border border-accent-cyan/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,255,255,0.05)_inset]">
                <p className="text-sm text-accent-cyan uppercase tracking-widest font-semibold mb-2">Projected Gross Revenue</p>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-5xl font-[800] text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">{formatCurrency(revenue)}</span>
                  <span className="text-accent-cyan/70 font-medium">/ mo</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-md border border-green-500/30 flex items-center gap-1">
                    <TrendingUp size={12} /> +{roi.toLocaleString()}% ROI
                  </div>
                  <span className="text-xs text-gray-400">vs Tech Overhead</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => navigate('/contact')}
                className="w-full mt-4 py-5 px-4 bg-white hover:bg-gray-200 text-black rounded-xl font-[800] uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 group text-xs sm:text-sm"
              >
                Unlock Custom Blueprint
                <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={18} />
              </button>
              <p className="text-center text-[10px] sm:text-[11px] text-gray-500 uppercase tracking-wider mt-4">
                Lock in a confidential 1-on-1 consultation to validate these projections. Zero commitments.
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ProfitEstimator;

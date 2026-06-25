import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';

const complianceOptions = {
  regulated: [
    { id: 'fsc', name: 'FSC Mauritius', time: '5-6 Months', totalCost: 37500, renewal: 26000 },
    { id: 'misa', name: 'MISA Comoros', time: '1-2 Months', totalCost: 33000, renewal: 27000 },
    { id: 'cysec', name: 'CySEC Cyprus', time: '7-8 Months', totalCost: 57000, renewal: 52000 },
    { id: 'fsa', name: 'FSA Seychelles', time: '2-3 Months', totalCost: 26000, renewal: 20000 },
    { id: 'labuan', name: 'Labuan FSA', time: '4-5 Months', totalCost: 29000, renewal: 20000 },
    { id: 'vfsc', name: 'VFSC Vanuatu', time: '4-5 Months', totalCost: 35000, renewal: 8000 },
  ],
  nonRegulated: [
    { id: 'stlucia', name: 'Saint Lucia', time: '2-3 Weeks', totalCost: 5000, renewal: 2500 },
    { id: 'svg', name: 'Saint Vincent Grenadines', time: '2-3 Weeks', totalCost: 4000, renewal: 2000 },
    { id: 'mauritius_auth', name: 'Mauritius (Authorize Company)', time: '2-3 Months', totalCost: 9000, renewal: 4000 },
    { id: 'bvi', name: 'British Virgin Islands (BVI)', time: '2-3 Weeks', totalCost: 4500, renewal: 2200 },
    { id: 'anguilla', name: 'Anguilla', time: '1-2 Months', totalCost: 7500, renewal: 3500 },
    { id: 'wales', name: 'Wales (United Kingdom)', time: '1-2 Weeks', totalCost: 500, renewal: 100 },
  ]
};

const steps = [
  {
    id: 1,
    title: 'Compliance',
    type: 'compliance',
    // handled specifically via complianceOptions
  },
  {
    id: 2,
    title: 'Logo + Favicon Design',
    type: 'single',
    options: [
      { id: 'logo_std', name: 'Standard Logo', time: '15 Days', oneTime: 500 },
      { id: 'logo_prem', name: 'Premium Logo', time: '20 Days', oneTime: 1000 },
    ]
  },
  {
    id: 3,
    title: 'Website Development',
    type: 'single',
    options: [
      { id: 'web_basic', name: 'Basic Website', time: '8-10 Days', pages: 'Up to 8', totalCost: 1000 },
      { id: 'web_std', name: 'Standard Website', time: '20-30 Days', pages: 'Up to 15', totalCost: 2000 },
      { id: 'web_prem', name: 'Premium Website', time: '30-45 Days', pages: 'Up to 30', totalCost: 4500 },
    ]
  },
  {
    id: 4,
    title: 'Hosting Server',
    type: 'multi',
    options: [
      { id: 'host_pri', name: 'Primary Server', time: '8-10 Days', monthly: 500 },
      { id: 'host_bak', name: 'Backup Server', time: '8-10 Days', monthly: 400 },
      { id: 'host_acc', name: 'Access Server', time: '12-15 Days', monthly: 400 },
      { id: 'host_vps', name: 'Fast VPS', time: '10-12 Days', monthly: 200 },
    ]
  },
  {
    id: 5,
    title: 'Trading Platform',
    type: 'single',
    options: [
      { id: 'plat_mt5', name: 'Meta Trader 5 (MT5)', time: '1-2 Months', monthly: 10000 },
      { id: 'plat_ct', name: 'C Trader', time: '1-2 Months', monthly: 8000 },
      { id: 'plat_sirix', name: 'Sirix', time: '12-15 Days', oneTime: 3500, monthly: 4500 },
      { id: 'plat_match', name: 'Match Trader', time: '1-2 Months', oneTime: 5000, monthly: 5000 },
      { id: 'plat_vertex', name: 'Vertex Fx', time: '12-15 Days', oneTime: 2500, monthly: 3500 },
      { id: 'plat_arc', name: 'Arc Trader', time: '12-15 Days', oneTime: 4000, monthly: 2500 },
    ]
  },
  {
    id: 6,
    title: 'CRM + Mobile App',
    type: 'single',
    options: [
      { id: 'crm_basic', name: 'Basic Plan', time: '15-20 Days', monthly: 1000 },
      { id: 'crm_std', name: 'Standard Plan', time: '25-30 Days', oneTime: 500, monthly: 1500 },
      { id: 'crm_cust', name: 'Customized Plan', time: '1-2 Months', oneTime: 1000, monthly: 2000 },
    ]
  },
  {
    id: 7,
    title: 'Gateway & Bridge',
    type: 'single',
    options: [
      { id: 'gb_mt5', name: 'MT5 Gateway', time: '12-15 Days', monthly: 1250 },
      { id: 'gb_std', name: 'Standard Bridge', time: '12-15 Days', oneTime: 1000, monthly: 1500 },
      { id: 'gb_prem', name: 'Premium Bridge', time: '22-25 Days', oneTime: 1500, monthly: 2000 },
    ]
  },
  {
    id: 8,
    title: 'Liquidity Provider',
    type: 'single',
    options: [
      { id: 'lp_t1', name: 'Primary Liquidity Provider (Tier 1)', time: '20-25 Days', deposit: 20000, monthly: 1500 },
      { id: 'lp_t2', name: 'Secondary Liquidity Provider (Tier 2)', time: '12-15 Days', deposit: 5000, monthly: 1000 },
      { id: 'lp_live', name: 'Live Feed', time: '5-7 Days', monthly: 1000 },
    ]
  },
  {
    id: 9,
    title: 'Plugins',
    type: 'multi',
    options: [
      { id: 'plug_tc', name: 'Trade Copier', time: '5-7 Days', monthly: 800 },
      { id: 'plug_pamm', name: 'PAMM', time: '8-10 Days', monthly: 1200 },
      { id: 'plug_social', name: 'Social Trading', time: '8-10 Days', monthly: 1500 },
      { id: 'plug_cm', name: 'Credit Management', time: '5-7 Days', monthly: 800 },
      { id: 'plug_swap', name: 'Swap-Free/Changer', time: '5-7 Days', monthly: 800 },
      { id: 'plug_risk', name: 'Risk Management', time: '10-12 Days', oneTime: 800, monthly: 1500 },
    ]
  },
  {
    id: 10,
    title: 'Digital Marketing',
    type: 'multi',
    options: [
      { id: 'dm_seo', name: 'Search Engine Optimization (SEO)', time: '30-45 Days', monthly: 1000 },
      { id: 'dm_ppc', name: 'Paid Search Marketing (PPC)', time: '7-10 Days', oneTime: 500, monthly: 1000 },
      { id: 'dm_smm', name: 'Social Media Marketing', time: '10-15 Days', oneTime: 1000, monthly: 1200 },
      { id: 'dm_pm', name: 'Performance Marketing', time: '10-15 Days', oneTime: 1500, monthly: 1500 },
      { id: 'dm_cm', name: 'Content Marketing', time: '10-15 Days', oneTime: 1500, monthly: 1000 },
      { id: 'dm_em', name: 'Email Marketing', time: '10-15 Days', oneTime: 300, monthly: 500 },
    ]
  }
];

const defaultState = {
  isRegulated: false,
  selections: {
    1: ['stlucia'],
    2: ['logo_std'],
    3: ['web_basic'],
    4: ['host_pri', 'host_bak'],
    5: ['plat_vertex'],
    6: ['crm_basic'],
    7: ['gb_std'],
    8: ['lp_t2'],
    9: ['plug_tc', 'plug_pamm'],
    10: ['dm_seo', 'dm_ppc']
  }
};

const BrokerSetupCalculator = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRegulated, setIsRegulated] = useState(defaultState.isRegulated);
  const [selections, setSelections] = useState(defaultState.selections);

  const handleReset = () => {
    setIsRegulated(defaultState.isRegulated);
    setSelections(defaultState.selections);
    setCurrentStepIndex(0);
  };

  const toggleSelection = (stepId, optionId, type) => {
    setSelections(prev => {
      const stepSelections = prev[stepId] || [];
      if (type === 'single' || type === 'compliance') {
        return { ...prev, [stepId]: [optionId] };
      } else {
        if (stepSelections.includes(optionId)) {
          return { ...prev, [stepId]: stepSelections.filter(id => id !== optionId) };
        } else {
          return { ...prev, [stepId]: [...stepSelections, optionId] };
        }
      }
    });
  };

  const getActiveOptionsList = () => {
    const active = [];
    // Compliance
    const compOptions = isRegulated ? complianceOptions.regulated : complianceOptions.nonRegulated;
    const compSel = selections[1] || [];
    compSel.forEach(id => {
      const opt = compOptions.find(o => o.id === id);
      if (opt) active.push({ ...opt, stepId: 1 });
    });

    // Other steps
    for (let i = 1; i < steps.length; i++) {
      const step = steps[i];
      const sel = selections[step.id] || [];
      sel.forEach(id => {
        const opt = step.options.find(o => o.id === id);
        if (opt) active.push({ ...opt, stepId: step.id });
      });
    }
    return active;
  };

  const calculateTotals = () => {
    let oneTime = 0;
    let monthly = 0;
    let renewal = 0;

    const activeOptions = getActiveOptionsList();

    activeOptions.forEach(opt => {
      if (opt.stepId === 1) {
        oneTime += opt.totalCost || 0;
        renewal += opt.renewal || 0;
      } else {
        oneTime += opt.oneTime || opt.totalCost || opt.deposit || 0;
        monthly += opt.monthly || 0;
      }
    });

    const annualizedMonthly = monthly * 12;
    const year1Total = oneTime + annualizedMonthly + renewal;

    return { oneTime, monthly, annualizedMonthly, renewal, year1Total };
  };

  const totals = calculateTotals();
  const currentStep = steps[currentStepIndex];

  return (
    <div className="min-h-screen text-white pt-24 pb-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4">
            Brokerage Startup Cost <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">Estimator</span>
          </h1>
          <p className="text-gray-400 text-lg">Calculate your exact technology, liquidity, and platform maintenance costs to launch your own turnkey brokerage.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Calculator Area */}
          <div className="flex-grow flex flex-col">
            
            {/* Step Indicators */}
            <div className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar gap-2">
              {steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    idx === currentStepIndex 
                    ? 'bg-accent-cyan text-white' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {step.id}. {step.title}
                </button>
              ))}
            </div>

            {/* Current Step Content */}
            <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 flex-grow">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">{currentStep.title}</h2>
                <span className="text-sm text-gray-500 font-medium">Step {currentStep.id} of 10</span>
              </div>

              {currentStep.type === 'compliance' && (
                <div className="mb-8 flex items-center justify-center gap-4 p-2 bg-white/5 rounded-full w-fit mx-auto border border-white/10">
                  <button 
                    onClick={() => { setIsRegulated(false); setSelections(prev => ({...prev, 1: []})) }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!isRegulated ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    Non-Regulated
                  </button>
                  <button 
                    onClick={() => { setIsRegulated(true); setSelections(prev => ({...prev, 1: []})) }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isRegulated ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    Regulated
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {currentStep.type === 'compliance' ? (
                   (isRegulated ? complianceOptions.regulated : complianceOptions.nonRegulated).map(opt => {
                     const isSelected = (selections[currentStep.id] || []).includes(opt.id);
                     return (
                       <div 
                         key={opt.id} 
                         onClick={() => toggleSelection(currentStep.id, opt.id, currentStep.type)}
                         className={`relative cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${isSelected ? 'border-accent-cyan bg-accent-cyan/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                       >
                         {isSelected && <div className="absolute top-4 right-4 text-accent-cyan"><Check size={20} /></div>}
                         <h3 className="text-lg font-bold text-white mb-2 pr-8">{opt.name}</h3>
                         <div className="text-sm text-gray-400 space-y-1">
                           <p>Setup Time: <span className="text-white">{opt.time}</span></p>
                           <p>Total Cost: <span className="text-white">${opt.totalCost.toLocaleString()}</span></p>
                           <p>Renewal Cost: <span className="text-white">${opt.renewal.toLocaleString()}</span></p>
                         </div>
                       </div>
                     )
                   })
                ) : (
                  currentStep.options.map(opt => {
                    const isSelected = (selections[currentStep.id] || []).includes(opt.id);
                    return (
                      <div 
                        key={opt.id} 
                        onClick={() => toggleSelection(currentStep.id, opt.id, currentStep.type)}
                        className={`relative cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${isSelected ? 'border-accent-cyan bg-accent-cyan/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                      >
                        {isSelected && <div className="absolute top-4 right-4 text-accent-cyan"><Check size={20} /></div>}
                        <div>
                          <h3 className="text-lg font-bold text-white mb-4 pr-8 leading-snug">{opt.name}</h3>
                        </div>
                        <div className="text-sm text-gray-400 space-y-2 mt-4 pt-4 border-t border-white/10">
                          {opt.time && <p className="flex justify-between"><span>Time:</span> <span className="text-white font-medium">{opt.time}</span></p>}
                          {opt.pages && <p className="flex justify-between"><span>Pages:</span> <span className="text-white font-medium">{opt.pages}</span></p>}
                          {(opt.oneTime !== undefined || opt.totalCost !== undefined || opt.deposit !== undefined) && (
                            <p className="flex justify-between">
                              <span>{opt.deposit !== undefined ? 'Min Deposit:' : 'One-Time:'}</span> 
                              <span className="text-white font-medium">${(opt.oneTime || opt.totalCost || opt.deposit).toLocaleString()}</span>
                            </p>
                          )}
                          {opt.monthly !== undefined && (
                            <p className="flex justify-between">
                              <span>Monthly:</span> 
                              <span className="text-white font-medium">${opt.monthly.toLocaleString()}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
                <button 
                  onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                <button 
                  onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
                  disabled={currentStepIndex === steps.length - 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black bg-white hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>

            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 bg-[#121212] border border-white/10 rounded-3xl p-6">
              <div className="flex justify-between items-start mb-6">
                 <h3 className="text-xl font-bold text-white uppercase tracking-wider">Summary</h3>
                 <button onClick={handleReset} className="text-gray-400 hover:text-white transition-colors" title="Reset Calculator">
                    <RefreshCw size={20} />
                 </button>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-400 font-medium mb-1 uppercase tracking-widest">Year 1 Total</p>
                <p className="text-4xl font-[800] text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
                  ${totals.year1Total.toLocaleString()}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">One-Time Cost</span>
                  <span className="text-white font-bold">${totals.oneTime.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Monthly Cost</span>
                  <span className="text-white font-bold">${totals.monthly.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Annualized Monthly</span>
                  <span className="text-white font-bold">${totals.annualizedMonthly.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Compliance Renewal</span>
                  <span className="text-white font-bold">${totals.renewal.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-accent-cyan hover:bg-cyan-400 text-white rounded-full font-bold uppercase tracking-widest transition-colors">
                Request Quote
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BrokerSetupCalculator;

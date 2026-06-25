import React from 'react';
import { motion } from 'framer-motion';
const About = () => {
  return <section id="about" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          amount: 0.3
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img class="w-full h-full object-cover" alt="Modern office with creative team working on computers" src="/images/modern_office.png" />
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          amount: 0.3
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white uppercase tracking-[0.1em]">
              Pioneering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-white">Forex Technology</span>
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider text-sm">Regulatory Expertise</h3>
                <p className="text-lg text-gray-400">Navigating complex jurisdictions like Dubai's SCA with precision, ensuring full compliance and operational readiness.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider text-sm">Turnkey Infrastructure</h3>
                <p className="text-lg text-gray-400">From company incorporation to tier-1 liquidity and white-label trading platforms, we provide complete A-Z setup.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-24">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          amount: 0.3
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }} className="lg:order-last">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img class="w-full h-full object-cover" alt="Diverse team collaborating around a table with laptops and notes" src="/images/team_collaboration.png" />
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          amount: 0.3
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white uppercase tracking-[0.1em]">
              Your Vision, Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-white">Global Execution</span>
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider text-sm">CRM & Back-Office</h3>
                <p className="text-lg text-gray-400">We integrate advanced CRM solutions with seamless payment gateways, customized for Forex brokerage workflows.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider text-sm">Marketing & Lead Gen</h3>
                <p className="text-lg text-gray-400">Implementing high-conversion digital funnels and affiliate programs to attract active traders globally.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default About;
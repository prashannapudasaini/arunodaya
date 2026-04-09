import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const team = [
    { name: "Anil Gupta", role: "Chairman" },
    { name: "Lak Nath Dhital", role: "Director" },
    { name: "Madhu Sudan Parajuli", role: "Director" },
    { name: "Bal Bahadur Devan", role: "Director" },
    { name: "Aariya Tamatta", role: "Director" }
  ];

  const revenueData = [
    { year: "2082/83", status: "Provisional", sales: "28,957,910" },
    { year: "2083/84", status: "Projected", sales: "106,179,003" },
    { year: "2084/85", status: "Projected", sales: "136,970,914" },
    { year: "2085/86", status: "Projected", sales: "161,625,679" },
    { year: "2086/87", status: "Projected", sales: "185,869,531" },
    { year: "2087/88", status: "Projected", sales: "213,749,960" },
    { year: "2088/89", status: "Projected", sales: "245,812,454" },
    { year: "2089/90", status: "Projected", sales: "270,393,700" },
    { year: "2090/91", status: "Projected", sales: "300,137,007" },
    { year: "2091/92", status: "Projected", sales: "345,157,558" },
  ];

  const goalsShort = [
    "Establish production capacity and market presence.",
    "Launch Live Experimental Drink Facility.",
    "Build domestic and international distribution channel.",
    "Strategic Investment Opportunities."
  ];

  const goalsLong = [
    "Position ADL among Nepal's top distilleries company.",
    "Expand exports to South Asia, South-East Asia, and global niche markets.",
    "Introduce high-end craft spirits and innovative RTD (Ready to Drink) formats.",
    "Maintain double-digit revenue growth with diversified income sources."
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="pt-40 pb-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* HEADER */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-24">
        <span className="text-brand-gold text-xs font-black tracking-[0.4em] uppercase mb-4 block">Our Heritage</span>
        <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-tight">The <span className="text-brand-gold italic">Legacy</span></h1>
        <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-8"></div>
      </motion.div>

      {/* COMPANY OVERVIEW & VISION */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
        <div>
          <h2 className="text-3xl font-serif mb-6 text-brand-gold">Company Overview</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
            Arunodaya Distillery Limited (ADL) is a manufacturing company focused on producing world-class whisky, vodka, rum, and dry gin. With modern distillation technology, strong branding, and a multi-market expansion strategy, ADL aims to be one of Nepal's most innovative and globally competitive distilleries.
          </p>
          <div className="liquid-glass p-8 border-l-4 border-l-brand-gold bg-white/5">
            <h3 className="text-xl font-serif text-brand-gold mb-3">Our Vision</h3>
            <p className="text-gray-300 font-light italic">
              "To become Nepal’s most trusted and globally recognized distillery, delivering excellence and innovation in every bottle through craftsmanship, technology, and sustainable growth."
            </p>
          </div>
        </div>
        <div className="liquid-glass h-full min-h-[400px] flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors duration-500"></div>
          <h3 className="text-2xl text-brand-gold font-serif italic border border-brand-gold p-6 rounded-xl z-10 backdrop-blur-sm">Excellence in Distillation</h3>
        </div>
      </motion.div>

      {/* MISSION & GOALS */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-brand-gold">Strategic Roadmap</h2>
          <p className="text-gray-400 mt-4 font-light">Our mission and goals for the future</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          
          <motion.div variants={fadeIn} className="liquid-glass p-8 hover:border-brand-gold/50 transition-colors">
            <h3 className="text-xl font-bold mb-6 text-brand-gold uppercase tracking-widest text-sm">Mission</h3>
            <ul className="space-y-4 text-gray-300 font-light text-sm">
              <li className="flex gap-3"><span className="text-brand-gold">▹</span> Craft alcohol using advanced blended technologies.</li>
              <li className="flex gap-3"><span className="text-brand-gold">▹</span> Establish innovative Live Experimental Drink Facility.</li>
              <li className="flex gap-3"><span className="text-brand-gold">▹</span> Expand operations domestically and build global exports.</li>
              <li className="flex gap-3"><span className="text-brand-gold">▹</span> Generate sustainable stakeholder value.</li>
            </ul>
          </motion.div>

          <motion.div variants={fadeIn} className="liquid-glass p-8 hover:border-brand-gold/50 transition-colors">
            <h3 className="text-xl font-bold mb-6 text-brand-gold uppercase tracking-widest text-sm">Short-Term Goals</h3>
            <ul className="space-y-4 text-gray-300 font-light text-sm">
              {goalsShort.map((goal, i) => (
                <li key={i} className="flex gap-3"><span className="text-brand-gold">▹</span> {goal}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeIn} className="liquid-glass p-8 hover:border-brand-gold/50 transition-colors">
            <h3 className="text-xl font-bold mb-6 text-brand-gold uppercase tracking-widest text-sm">Long-Term Goals</h3>
            <ul className="space-y-4 text-gray-300 font-light text-sm">
              {goalsLong.map((goal, i) => (
                <li key={i} className="flex gap-3"><span className="text-brand-gold">▹</span> {goal}</li>
              ))}
            </ul>
          </motion.div>

        </div>
      </motion.div>

      {/* BUSINESS MODEL */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="mb-32 liquid-glass p-10 md:p-16 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl"></div>
         <h2 className="text-3xl font-serif text-brand-gold mb-10 text-center">Business Model</h2>
         <div className="grid md:grid-cols-3 gap-10 relative z-10">
            <div>
              <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-3">Value Chain</h4>
              <p className="text-gray-300 font-light text-sm leading-relaxed">Utilizing a Grain-to-Glass approach to ensure total control over raw material quality. Multi-column vacuum distillation achieves high-purity yields while optimizing energy.</p>
            </div>
            <div>
              <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-3">Revenue Streams</h4>
              <p className="text-gray-300 font-light text-sm leading-relaxed">A Diversified Portfolio Strategy maximizing market penetration across the Mass Market, Premium Segment, and Business & Corporate Travellers.</p>
            </div>
            <div>
              <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-3">Distribution</h4>
              <p className="text-gray-300 font-light text-sm leading-relaxed">A Hybrid Distribution Framework designed to navigate the regulatory landscape, including Direct to Wholesale, Hospitality, Retailers, and Online.</p>
            </div>
         </div>
      </motion.div>

      {/* REVENUE TABLE */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="liquid-glass p-8 lg:p-12 mb-32">
        <h2 className="text-3xl font-serif text-brand-gold mb-2">Financial Trajectory</h2>
        <p className="text-gray-400 font-light mb-8 text-sm tracking-widest uppercase">Projected Annual Sales (10-Year Outlook)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-400">Fiscal Year</th>
                <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-400">Status</th>
                <th className="p-4 text-right text-xs font-black uppercase tracking-wider text-gray-400">Sales (NRS)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {revenueData.map((row, i) => (
                <motion.tr 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-semibold text-white">{row.year}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${row.status === 'Provisional' ? 'bg-blue-900/30 text-blue-300 border border-blue-500/30' : 'bg-green-900/30 text-green-300 border border-green-500/30'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-serif text-lg text-brand-gold">NPR {row.sales}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* BOARD OF DIRECTORS */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mb-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-brand-gold">Board of Directors</h2>
          <p className="text-gray-400 mt-4 font-light">The visionaries guiding our journey</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member, index) => (
            <motion.div key={index} variants={fadeIn} className="liquid-glass p-8 text-center hover:border-brand-gold/50 transition-colors group">
              <h3 className="text-lg font-bold mb-2 group-hover:text-brand-gold transition-colors">{member.name}</h3>
              <p className="text-brand-gold text-xs uppercase tracking-widest">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
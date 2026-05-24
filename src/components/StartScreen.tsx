/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Fingerprint, Sparkles, Timer, CheckCircle, ShieldCheck } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center max-w-lg mx-auto px-4 py-8"
      id="start-screen-container"
    >
      {/* Nice small floating icon */}
      <motion.div
        variants={itemVariants}
        className="relative flex items-center justify-center w-20 h-20 bg-[#7C8E79] text-white rounded-[24px] shadow-sm mb-6 border border-[#7C8E79]/20"
        id="icon-wrapper"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Fingerprint className="w-10 h-10 stroke-[1.5]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
          className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 p-1.5 rounded-full shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
        </motion.div>
      </motion.div>

      {/* Headline & Description */}
      <motion.p
        variants={itemVariants}
        className="text-xs font-semibold tracking-widest text-[#7C8E79] uppercase mb-2 font-display"
      >
        Myers-Briggs Methodology
      </motion.p>
      
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl font-serif italic text-[#2D332D] tracking-tight mb-4 leading-[1.15]"
        id="app-title"
      >
        Personafy <br />
        <span className="text-[#7C8E79] font-normal not-italic text-2xl sm:text-3xl tracking-normal block mt-1">
          know your personality
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-base text-[#8C8C8C] leading-relaxed mb-8 max-w-sm font-light"
        id="app-subtitle"
      >
        Journey inward. Uncover the core drivers of your social energy, decision-making, and lifestyle preferences in under 3 minutes.
      </motion.p>

      {/* Key points grid */}
      <motion.div
        variants={itemVariants}
        className="w-full bg-white border border-[#EAE7E1] rounded-[32px] p-6 shadow-sm text-left space-y-4 mb-8"
        id="perks-grid"
      >
        <div className="flex items-start space-x-3.5">
          <div className="p-2 bg-[#F4F5F2] text-[#7C8E79] rounded-xl mt-0.5">
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#2D332D]">Quick & Accurate</h4>
            <p className="text-xs text-[#8C8C8C]">12 intuitive scenario-based questions with 4-level scoring options.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3.5">
          <div className="p-2 bg-[#F4F5F2] text-[#7C8E79] rounded-xl mt-0.5">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#2D332D]">Comprehensive Analysis</h4>
            <p className="text-xs text-[#8C8C8C]">Get dimensions weights, career tracks, and core strengths.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3.5">
          <div className="p-2 bg-[#F4F5F2] text-[#7C8E79] rounded-xl mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#2D332D]">100% Secure & Local</h4>
            <p className="text-xs text-[#8C8C8C]">Runs completely in-browser. All logic is instant and private.</p>
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div variants={itemVariants} className="w-full" id="start-button-wrapper">
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.02, translateY: -1 }}
          whileTap={{ scale: 0.98 }}
          id="btn-start-quiz"
          className="w-full sm:w-64 py-4 px-8 bg-[#7C8E79] text-white font-semibold rounded-full shadow-lg shadow-[#7C8E79]/20 hover:bg-[#6B7B68] transition-all inline-flex items-center justify-center space-x-2.5 cursor-pointer text-base border-0"
        >
          <span>Begin Discovery</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}


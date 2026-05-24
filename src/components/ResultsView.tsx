/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserResponse,
  PersonalityDimensionStats,
  Dimension,
  PersonalityTypeDetails
} from '../types';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import {
  RotateCcw,
  Share2,
  Check,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  Users,
  ExternalLink,
  Crown
} from 'lucide-react';

interface ResultsViewProps {
  responses: UserResponse[];
  onRestart: () => void;
}

export function ResultsView({ responses, onRestart }: ResultsViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'strengths' | 'careers' | 'famous'>('overview');
  const [copied, setCopied] = useState(false);

  // 1. Calculate scores and percentages for the 4 axes
  const stats = useMemo(() => {
    const counts: Record<Dimension, number> = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    responses.forEach(res => {
      counts[res.dimension] += res.weight;
    });

    const getAxis = (dimA: Dimension, dimB: Dimension): PersonalityDimensionStats => {
      const a = counts[dimA];
      const b = counts[dimB];
      const total = a + b;
      
      if (total === 0) {
        return { scoreA: 0, scoreB: 0, percentageA: 50, percentageB: 50, dominant: dimA };
      }

      const percentageA = Math.round((a / total) * 100);
      const percentageB = 100 - percentageA;
      const dominant = a >= b ? dimA : dimB;

      return { scoreA: a, scoreB: b, percentageA, percentageB, dominant };
    };

    return {
      energy: getAxis('E', 'I'),
      perception: getAxis('N', 'S'), // Usually N vs S
      judgment: getAxis('T', 'F'),
      lifestyle: getAxis('J', 'P')
    };
  }, [responses]);

  // 2. Derive 4-letter MBTI code
  const mbtiCode = useMemo(() => {
    const e_i = stats.energy.dominant;
    // Map dominant perception axis
    const n_s = stats.perception.dominant;
    const t_f = stats.judgment.dominant;
    const j_p = stats.lifestyle.dominant;
    return `${e_i}${n_s}${t_f}${j_p}`;
  }, [stats]);

  // 3. Look up personality type details
  const details: PersonalityTypeDetails = useMemo(() => {
    return PERSONALITY_TYPES[mbtiCode] || PERSONALITY_TYPES['INTJ'];
  }, [mbtiCode]);

  // Handle sharing
  const handleShare = async () => {
    const shareText = `🔍 Discovering my personality type! I mapped out as "${details.name}" (${details.code}) — ${details.tagline}. Take your own client-side personality quiz here!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Personality Type Result',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to Clipboard
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Failed to copy
    }
  };

  // Rendering individual axis sliders
  const renderAxisSlider = (
    labelLeft: string,
    labelRight: string,
    percentLeft: number,
    percentRight: number,
    descLeft: string,
    descRight: string
  ) => {
    return (
      <div className="space-y-1.5" id={`axis-${labelLeft}-${labelRight}`}>
        <div className="flex justify-between items-end text-xs font-semibold">
          <span className={percentLeft >= percentRight ? 'text-[#7C8E79] font-bold' : 'text-[#8C8C8C]'}>
            {labelLeft} <span className="font-mono text-[10px] ml-1">({percentLeft}%)</span>
          </span>
          <span className="text-[10px] font-normal text-[#8C8C8C] capitalize">
            {percentLeft >= percentRight ? descLeft : descRight} Dominant
          </span>
          <span className={percentRight > percentLeft ? 'text-[#B69675] font-bold' : 'text-[#8C8C8C]'}>
            <span className="font-mono text-[10px] mr-1">({percentRight}%)</span> {labelRight}
          </span>
        </div>

        {/* Visual Track */}
        <div className="relative w-full h-3 bg-[#EAE7E1]/60 rounded-full overflow-hidden">
          {/* Midpoint line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#EAE7E1] z-10" />

          {/* Color bar filling towards dominant side */}
          {percentLeft >= 50 ? (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentLeft - 50}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute right-1/2 h-full bg-gradient-to-l from-[#7C8E79] to-[#91A38E] rounded-l"
            />
          ) : (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentRight - 50}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute left-1/2 h-full bg-gradient-to-r from-[#B69675] to-[#C9AB8C] rounded-r"
            />
          )}
        </div>
        
        {/* Helper subtext */}
        <div className="flex justify-between text-[10px] text-[#8C8C8C] px-1 font-mono">
          <span>{descLeft}</span>
          <span>{descRight}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-3" id="results-view">
      {/* Dynamic Copy Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#2D332D] border border-[#EAE7E1]/20 text-white text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center space-x-2"
            id="toast"
          >
            <Check className="w-4 h-4 text-[#7C8E79]" />
            <span>Result description copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main result badge card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full text-white rounded-[32px] p-6 sm:p-8 shadow-xl relative overflow-hidden bg-gradient-to-b ${details.gradientClass} mb-6 border border-[#2D332D]/35`}
        id="result-hero-card"
      >
        {/* Glow effect */}
        <div className="absolute -top-24 -right-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        {/* Badge Icon */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/10 rounded-xl">
            <Crown className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <span className="text-[10px] tracking-widest uppercase font-bold text-slate-200 font-mono">
            Personality Match Determined
          </span>
        </div>

        {/* Big Code and Archetype */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2.5">
          <div>
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              {details.code}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif italic font-bold mt-1 text-slate-100">
              {details.name}
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5 self-start sm:self-auto uppercase tracking-wider font-mono">
            {stats.energy.dominant === 'E' ? 'Extraverted' : 'Introverted'}{' • '}{stats.perception.dominant === 'N' ? 'Intuitive' : 'Observant'}
          </p>
        </div>

        <p className="text-sm text-slate-100/90 leading-relaxed mt-4 border-t border-white/10 pt-4 font-sans font-light">
          {details.tagline}
        </p>
      </motion.div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="results-grid">
        {/* Left Column: Dimensions slider list (Takes 5 cols) */}
        <div className="md:col-span-5 bg-white border border-[#EAE7E1] rounded-[32px] p-6 shadow-sm space-y-5" id="dimensions-panel">
          <div className="flex items-center space-x-2 pb-2.5 border-b border-[#EAE7E1]">
            <TrendingUp className="w-4 h-4 text-[#7C8E79]" />
            <h3 className="text-sm font-bold text-[#2D332D] uppercase tracking-wider font-display">
              Dimensions Breakdown
            </h3>
          </div>

          <div className="space-y-4">
            {renderAxisSlider(
              'Extraverted (E)',
              'Introverted (I)',
              stats.energy.percentageA,
              stats.energy.percentageB,
              'Interactive',
              'Reflective'
            )}

            {renderAxisSlider(
              'Intuitive (N)',
              'Sensing (S)',
              stats.perception.percentageA,
              stats.perception.percentageB,
              'Conceptual',
              'Practical'
            )}

            {renderAxisSlider(
              'Thinking (T)',
              'Feeling (F)',
              stats.judgment.percentageA,
              stats.judgment.percentageB,
              'Objective',
              'Empathetic'
            )}

            {renderAxisSlider(
              'Judging (J)',
              'Perceiving (P)',
              stats.lifestyle.percentageA,
              stats.lifestyle.percentageB,
              'Structured',
              'Spontaneous'
            )}
          </div>
        </div>

        {/* Right Column: Tabbed analysis (Takes 7 cols) */}
        <div className="md:col-span-7 bg-white border border-[#EAE7E1] rounded-[32px] p-6 shadow-sm flex flex-col" id="analysis-tabs-panel">
          {/* Tab headers */}
          <div className="flex border-b border-[#EAE7E1] mb-4 overflow-x-auto scrollbar-none" id="tabs-header">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 text-xs font-semibold px-3 uppercase tracking-wider border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-[#7C8E79] text-[#7C8E79]'
                  : 'border-transparent text-[#8C8C8C] hover:text-[#2D332D]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('strengths')}
              className={`pb-2.5 text-xs font-semibold px-3 uppercase tracking-wider border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'strengths'
                  ? 'border-[#7C8E79] text-[#7C8E79]'
                  : 'border-transparent text-[#8C8C8C] hover:text-[#2D332D]'
              }`}
            >
              Strengths
            </button>
            <button
              onClick={() => setActiveTab('careers')}
              className={`pb-2.5 text-xs font-semibold px-3 uppercase tracking-wider border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'careers'
                  ? 'border-[#7C8E79] text-[#7C8E79]'
                  : 'border-transparent text-[#8C8C8C] hover:text-[#2D332D]'
              }`}
            >
              Careers
            </button>
            <button
              onClick={() => setActiveTab('famous')}
              className={`pb-2.5 text-xs font-semibold px-3 uppercase tracking-wider border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'famous'
                  ? 'border-[#7C8E79] text-[#7C8E79]'
                  : 'border-transparent text-[#8C8C8C] hover:text-[#2D332D]'
              }`}
            >
              Inspirations
            </button>
          </div>

          {/* Tab Content Box */}
          <div className="flex-grow text-left text-sm" id="canvas-tab-content">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="tab-overview"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-slate-600 leading-relaxed font-sans">
                    {details.description}
                  </p>
                  
                  {/* Decorative quote box */}
                  <div className={`p-4 rounded-xl border border-[#EAE7E1] bg-[#F4F5F2]/40`}>
                    <h4 className="font-semibold text-[#2D332D] text-xs flex items-center space-x-1.5 mb-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#7C8E79]" />
                      <span>The Core Essence of {details.code}</span>
                    </h4>
                    <p className="text-xs text-[#8C8C8C] leading-normal italic">
                      "You operate with internal models of possibility. Rather than settling for how things appear today, you investigate how they should work tomorrow."
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'strengths' && (
                <motion.div
                  key="tab-strengths"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-[#7C8E79]" />
                      <span>Core Talents & Gifts</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                       {details.strengths.map((str, idx) => (
                        <div key={idx} className="flex items-center space-x-2 p-2 bg-[#F4F5F2] border border-[#7C8E79]/20 rounded-lg">
                          <span className="w-1.5 h-1.5 bg-[#7C8E79] rounded-full" />
                          <span className="text-xs font-medium text-[#2D332D]">{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#B69675]" />
                      <span>Self-Growth Opportunities</span>
                    </h4>
                    <div className="space-y-2">
                      {details.weaknesses.map((weak, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-[#4A4A4A] bg-[#F9F6F2] border border-[#B69675]/20 p-2.5 rounded-lg leading-relaxed">
                          <span className="text-[#B69675] mt-0.5 font-bold">•</span>
                          <span>{weak}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'careers' && (
                <motion.div
                  key="tab-careers"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <p className="text-[#8C8C8C] text-xs leading-normal">
                    Individuals with natural <strong className="text-[#2D332D] font-semibold">{details.code}</strong> strengths excel in occupational environments that prize their primary axes. Here are high-fit career paths:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1.5">
                    {details.careers.map((car, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-white hover:bg-[#F4F5F2]/50 rounded-[16px] border border-[#EAE7E1] transition-colors">
                        <div className="p-1.5 bg-[#F4F5F2] text-[#7C8E79] rounded-lg border border-[#EAE7E1]/50">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-[#4A4A4A]">{car}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'famous' && (
                <motion.div
                  key="tab-famous"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <p className="text-[#8C8C8C] text-xs leading-normal">
                    You share this rare psychological combination with these historic change-makers and realists:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2.5 pt-1.5">
                    {details.famousPeople.map((person, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 p-3 bg-gradient-to-br from-[#F4F5F2]/40 to-[#F9F6F2]/70 border border-[#EAE7E1] rounded-[16px]">
                        <Users className="w-4 h-4 text-[#7C8E79] shrink-0" />
                        <span className="text-xs font-semibold text-[#2D332D] truncate">{person}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Primary Actions Button Rail */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8" id="actions-rail">
        <motion.button
          onClick={handleShare}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#7C8E79] border-0 text-white font-semibold rounded-full shadow-lg shadow-[#7C8E79]/20 hover:bg-[#6B7B68] transition-all cursor-pointer text-sm font-sans flex items-center justify-center space-x-2"
          id="btn-share-results"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Profile</span>
        </motion.button>

        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-8 py-3.5 bg-white border border-[#EAE7E1] text-[#4A4A4A] hover:text-[#2D332D] font-semibold rounded-full hover:bg-[#F4F5F2] transition-all cursor-pointer text-sm font-sans flex items-center justify-center space-x-2"
          id="btn-restart-quiz"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Quiz</span>
        </motion.button>
      </div>
    </div>
  );
}

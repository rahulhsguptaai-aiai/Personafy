/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { QuizQuestion, Dimension } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string, dimension: Dimension, weight: number) => void;
  onBack: () => void;
  isFirst: boolean;
}

const OPTION_PREFIXES = ['A', 'B', 'C', 'D'];

export function QuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
  onBack,
  isFirst,
}: QuestionCardProps) {
  // Animating the stagger of options
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4" id={`question-card-${question.id}`}>
      {/* Back button */}
      <div className="flex justify-start mb-4">
        <button
          onClick={onBack}
          className="group flex items-center space-x-1.5 text-xs text-[#8C8C8C] hover:text-[#2D332D] transition-colors cursor-pointer py-1.5 focus:outline-none"
          id="btn-back"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>{isFirst ? 'Cancel Quiz' : 'Previous Question'}</span>
        </button>
      </div>

      {/* Question Header */}
      <div className="mb-8 mt-1 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-serif italic text-[#2D332D] leading-tight">
          "{question.questionText}"
        </h2>
        {question.subtitle && (
          <p className="text-sm text-[#8C8C8C] mt-3 font-sans font-light leading-relaxed">
            {question.subtitle}
          </p>
        )}
      </div>

      {/* Option Cards */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        key={question.id} // Forces re-animation on question switch
        className="space-y-4"
        id="options-container"
      >
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <motion.button
              key={option.id}
              variants={itemVariants}
              onClick={() => onSelectOption(option.id, option.dimension, option.weight)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.995 }}
              className={`group w-full text-left p-6 sm:p-7 rounded-[24px] border flex items-center justify-between space-x-4 transition-all cursor-pointer text-sm font-sans focus:outline-none ${
                isSelected
                  ? 'bg-[#F4F5F2] border-2 border-[#7C8E79] shadow-lg shadow-[#7C8E79]/5'
                  : 'bg-white border-[#EAE7E1] hover:border-[#7C8E79] hover:shadow-md hover:shadow-[#7C8E79]/5 hover:bg-[#FBFBFB]'
              }`}
              id={`option-${option.id}`}
            >
              <div className="flex items-center space-x-4">
                {/* Index indicator */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs shrink-0 font-display transition-all ${
                    isSelected
                      ? 'bg-[#7C8E79] text-white border-transparent'
                      : 'border border-[#EAE7E1] text-[#8C8C8C] group-hover:bg-[#7C8E79] group-hover:text-white group-hover:border-transparent'
                  }`}
                >
                  {OPTION_PREFIXES[idx]}
                </div>

                {/* Option Text */}
                <div className="flex-grow pr-2">
                  <span
                    className={`block transition-colors leading-relaxed font-normal ${
                      isSelected ? 'text-[#2D332D] font-semibold' : 'text-[#4A4A4A]'
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
              </div>

              {/* Selected Checkmark Icon */}
              {isSelected && (
                <div className="shrink-0 text-[#7C8E79]" id="selected-checkmark">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

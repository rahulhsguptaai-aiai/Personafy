/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion, UserResponse, Dimension } from './types';
import { QUESTIONS } from './data/questions';
import { StartScreen } from './components/StartScreen';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { ResultsView } from './components/ResultsView';
import { Fingerprint, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'start' | 'quiz' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);

  // Get current active question
  const currentQuestion: QuizQuestion = QUESTIONS[currentQuestionIndex];

  // Start the quiz
  const handleStart = () => {
    setResponses([]);
    setCurrentQuestionIndex(0);
    setStep('quiz');
  };

  // Record an answer and auto-advance after a small delay for premium UX
  const handleSelectOption = (
    optionId: string,
    dimension: Dimension,
    weight: number
  ) => {
    // Save response to state
    setResponses(prev => {
      const next = [...prev];
      next[currentQuestionIndex] = {
        questionId: currentQuestion.id,
        selectedOptionId: optionId,
        dimension,
        weight,
      };
      return next;
    });

    // Provide a small visual window so the option card's select animation registers
    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStep('results');
      }
    }, 320);
  };

  // Back-navigation with step boundary guard
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep('start');
      setResponses([]);
      setCurrentQuestionIndex(0);
    }
  };

  // Restart the quiz from results
  const handleRestart = () => {
    setResponses([]);
    setCurrentQuestionIndex(0);
    setStep('start');
  };

  return (
    <div
      className="min-h-screen bg-[#FBF9F6] flex flex-col justify-between relative overflow-hidden z-10"
      id="app-root-container"
    >
      {/* Dynamic Ambient Backwash */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C8E79] rounded-full opacity-[0.03] blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#B69675] rounded-full opacity-[0.03] blur-[140px] pointer-events-none -z-10" />

      {/* Dynamic Header */}
      <header
        className={`w-full py-5 border-b transition-all ${
          step === 'start' ? 'bg-transparent border-transparent' : 'bg-[#FBF9F6]/80 backdrop-blur-md border-[#EAE7E1]'
        }`}
        id="app-site-header"
      >
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className={`p-1.5 rounded-xl transition-all ${step === 'start' ? 'bg-[#7C8E79]/10 text-[#7C8E79]' : 'bg-[#7C8E79] text-white'}`}>
              <Fingerprint className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#2D332D] font-serif italic">
              Personafy
            </span>
          </div>

          {step === 'quiz' && (
            <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-[#F4F5F2] border border-[#EAE7E1] text-[#7C8E79] rounded-full">
              Local Engine
            </span>
          )}

          {step === 'results' && (
            <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-[#F4F5F2] border border-[#7C8E79]/20 text-[#7C8E79] rounded-full flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7C8E79] inline shrink-0" />
              <span>Quiz Completed</span>
            </span>
          )}
        </div>
      </header>

      {/* Main interactive state board */}
      <main className="flex-grow flex items-center justify-center py-6 sm:py-10" id="main-content-layout">
        <div className="w-full max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'start' && (
              <motion.div
                key="start-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <StartScreen onStart={handleStart} />
              </motion.div>
            )}

            {step === 'quiz' && (
              <motion.div
                key={`quiz-flow-${currentQuestion.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="w-full"
              >
                {/* Visual progression */}
                <ProgressBar
                  current={currentQuestionIndex + 1}
                  total={QUESTIONS.length}
                  category={currentQuestion.category}
                />

                {/* Question and selection choices */}
                <QuestionCard
                  question={currentQuestion}
                  selectedOptionId={
                    responses[currentQuestionIndex]?.selectedOptionId || null
                  }
                  onSelectOption={handleSelectOption}
                  onBack={handleBack}
                  isFirst={currentQuestionIndex === 0}
                />
              </motion.div>
            )}

            {step === 'results' && (
              <motion.div
                key="results-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <ResultsView responses={responses} onRestart={handleRestart} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modern minimal footer */}
  
    </div>
  );
}

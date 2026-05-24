/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface ProgressBarProps {
  current: number;
  total: number;
  category: 'energy' | 'perception' | 'judgment' | 'lifestyle';
}

const CATEGORY_LABELS = {
  energy: { name: 'Social Energy (E vs I)', color: 'text-[#7C8E79] bg-[#F4F5F2] border-[#7C8E79]/25' },
  perception: { name: 'Information Gathering (S vs N)', color: 'text-[#B69675] bg-[#F9F6F2] border-[#B69675]/25' },
  judgment: { name: 'Decision Strategy (T vs F)', color: 'text-[#A96B50] bg-[#FAF3F0] border-[#A96B50]/25' },
  lifestyle: { name: 'Approach to Life (J vs P)', color: 'text-[#5D6F67] bg-[#F2F5F4] border-[#5D6F67]/25' },
};

export function ProgressBar({ current, total, category }: ProgressBarProps) {
  const percentage = Math.round(((current - 1) / total) * 100);
  const info = CATEGORY_LABELS[category];

  return (
    <div className="w-full max-w-lg mx-auto mb-8 px-4" id="progress-bar-container">
      {/* Header stats line */}
      <div className="flex justify-between items-center mb-3 text-xs">
        <span className={`px-2.5 py-1 rounded-full font-medium border ${info.color}`}>
          {info.name}
        </span>
        <span className="font-mono text-[#8C8C8C] font-medium">
          Question <strong className="text-[#2D332D]">{current}</strong> of {total}
        </span>
      </div>

      {/* Progress track */}
      <div className="relative w-full h-1.5 bg-[#EAE7E1] rounded-full overflow-hidden" id="progress-track">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-[#7C8E79]"
          initial={{ width: 0 }}
          animate={{ width: `${((current) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          id="progress-fill"
        />
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Dimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface QuizOption {
  id: string;
  text: string;
  // Which dimension does this option lean towards
  dimension: Dimension;
  // Weight contribution (normally 1 or 2)
  weight: number;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  subtitle?: string;
  options: QuizOption[];
  category: 'energy' | 'perception' | 'judgment' | 'lifestyle'; // E/I, S/N, T/F, J/P
}

export interface PersonalityDimensionStats {
  scoreA: number; // e.g. E score
  scoreB: number; // e.g. I score
  percentageA: number; // % e.g. 60% Extravert
  percentageB: number; // % e.g. 40% Introvert
  dominant: Dimension;
}

export interface PersonalityTypeDetails {
  code: string; // e.g., 'INTJ'
  name: string; // e.g., 'The Architect'
  tagline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  famousPeople: string[];
  gradientClass: string;
  bgDecorativeClass: string;
  textColor: string;
}

export interface UserResponse {
  questionId: number;
  selectedOptionId: string;
  dimension: Dimension;
  weight: number;
}

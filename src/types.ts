/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Environment' | 'Well-Being' | 'Compassion' | 'Responsible AI';

export interface QuizAnswers {
  age: string;
  gender: string;
  categories: Category[];
  currentHabitLevel: string;
  timeCommitment: string[];
  motivation: string[];
  friction: string[];
  livingArrangement: string;
  primaryConstraint: string[];
}

export interface Goal {
  id: string;
  title: string;
  action: string;
  impact: string;
  category: Category;
}

export interface RecommendationResponse {
  topGoal: Goal;
  alternatives: Goal[];
}

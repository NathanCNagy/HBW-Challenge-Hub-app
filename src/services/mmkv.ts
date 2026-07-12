/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Goal, QuizAnswers } from '../types';

// Robust local storage wrapper that uses MMKV on-device and falls back to localStorage in browser simulator.
let storage: any = null;

try {
  const { MMKV } = require('react-native-mmkv');
  storage = new MMKV();
} catch (e) {
  // Fallback to web localStorage or a memory map
  storage = {
    getString: (key: string) => typeof window !== 'undefined' ? localStorage.getItem(key) : null,
    set: (key: string, value: any) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, typeof value === 'string' ? value : String(value));
      }
    },
    delete: (key: string) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    },
    getBoolean: (key: string) => {
      if (typeof window !== 'undefined') {
        const val = localStorage.getItem(key);
        return val === 'true';
      }
      return false;
    }
  };
}

export const getCommittedGoal = (): Goal | null => {
  const goalStr = storage.getString('hbw_committed_goal');
  return goalStr ? JSON.parse(goalStr) : null;
};

export const setCommittedGoal = (goal: Goal | null) => {
  if (goal) {
    storage.set('hbw_committed_goal', JSON.stringify(goal));
  } else {
    storage.delete('hbw_committed_goal');
  }
};

export const getQuizAnswers = (defaultAnswers: QuizAnswers): QuizAnswers => {
  const saved = storage.getString('hbw_quiz_answers');
  return saved ? JSON.parse(saved) : defaultAnswers;
};

export const setQuizAnswers = (answers: QuizAnswers) => {
  storage.set('hbw_quiz_answers', JSON.stringify(answers));
};

export default storage;

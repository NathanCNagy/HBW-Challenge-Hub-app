/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { QuizAnswers, Goal } from './types';
import OnboardingQuiz from './components/OnboardingQuiz';
import GoalRecommendations from './components/GoalRecommendations';
import DashboardSimulation from './components/DashboardSimulation';
import DeviceSimulator from './components/DeviceSimulator';
import { getRecommendedGoals } from './data';
import AuthScreen from './components/AuthScreen';

interface MockUser {
  displayName: string;
  email: string;
}

export default function App() {
  // Mock Authentication & Guest states (Clickable prototype)
  const [user, setUser] = useState<MockUser | null>(() => {
    const saved = localStorage.getItem('hbw_mock_logged_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading mock user:', e);
      }
    }
    return null;
  });

  const [isGuest, setIsGuest] = useState<boolean>(() => {
    return localStorage.getItem('hbw_is_guest') === 'true';
  });
  
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Application view state cycle: 'quiz' | 'recommendations' | 'dashboard'
  // Load initial committed goal to keep user in active dashboard across refreshes
  const [committedGoal, setCommittedGoal] = useState<Goal | null>(() => {
    const saved = localStorage.getItem('hbw_committed_goal');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading committed goal:', e);
      }
    }
    return null;
  });

  const [currentPage, setCurrentPage] = useState<'quiz' | 'recommendations' | 'dashboard'>(() => {
    const savedGoal = localStorage.getItem('hbw_committed_goal');
    return savedGoal ? 'dashboard' : 'quiz';
  });

  // Track if they have successfully logged in / completed onboarding before
  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('hbw_has_logged_in') === 'true';
  });

  // Unified quiz answers schema state, with local storage memory
  const [answers, setAnswers] = useState<QuizAnswers>(() => {
    const saved = localStorage.getItem('hbw_quiz_answers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading quiz answers:', e);
      }
    }
    return {
      age: '28',
      gender: 'Male',
      categories: ['Environment'],
      currentHabitLevel: 'Rarely / Never',
      timeCommitment: ['5 Minutes (Microchange)'],
      motivation: ['Personal growth & optimization'],
      friction: ['Forgetting & failing to keep track'],
      livingArrangement: 'Living with family/children',
      primaryConstraint: ['Extremely busy schedule & limited energy']
    };
  });

  // Recommendation outputs
  const [topGoal, setTopGoal] = useState<Goal | null>(null);
  const [alternatives, setAlternatives] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasAI, setHasAI] = useState<boolean>(false);

  // Simulate a quick responsive boot syncing local cache data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Submit onboarding quiz to acquire dynamic recommendations offline with zero token cost
  const handleSubmitQuiz = async () => {
    setIsLoading(true);
    // Save current answers to local storage
    localStorage.setItem('hbw_quiz_answers', JSON.stringify(answers));

    // Simulate a brief scientific evaluation step for premium UX feedback
    setTimeout(() => {
      try {
        const matched = getRecommendedGoals(answers);
        setTopGoal(matched.topGoal);
        setAlternatives(matched.alternatives);
        setHasAI(false); // Runs completely local & offline!
      } catch (err) {
        console.error('Error generating offline goals:', err);
      } finally {
        setIsLoading(false);
        setCurrentPage('recommendations');
      }
    }, 900);
  };

  const handleCommitGoal = (goal: Goal) => {
    setCommittedGoal(goal);
    localStorage.setItem('hbw_committed_goal', JSON.stringify(goal));
    localStorage.setItem('hbw_has_logged_in', 'true');
    setHasLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleResetQuiz = () => {
    setTopGoal(null);
    setAlternatives([]);
    setCommittedGoal(null);
    localStorage.removeItem('hbw_committed_goal');
    setCurrentPage('quiz');
  };

  const handleUpdateAnswers = (newAnswers: QuizAnswers) => {
    setAnswers(newAnswers);
    localStorage.setItem('hbw_quiz_answers', JSON.stringify(newAnswers));
  };

  // Clickable prototype authentication callbacks
  const handleLoginSuccess = (displayName: string, email: string) => {
    const mockProfile = { displayName, email };
    setUser(mockProfile);
    localStorage.setItem('hbw_mock_logged_user', JSON.stringify(mockProfile));
    
    // Also mark logged-in so quiz behaves accordingly
    localStorage.setItem('hbw_has_logged_in', 'true');
    setHasLoggedIn(true);
  };

  const handleSignOut = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('hbw_mock_logged_user');
    localStorage.removeItem('hbw_is_guest');
    
    // Clear committed goal to simulate user reset
    setCommittedGoal(null);
    localStorage.removeItem('hbw_committed_goal');
    setCurrentPage('quiz');
  };

  const handleContinueAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem('hbw_is_guest', 'true');
  };

  const handleGoToAuth = () => {
    setIsGuest(false);
    localStorage.removeItem('hbw_is_guest');
  };

  // Loader state while checking local sandbox status on boot
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#00050c] text-slate-100 font-sans flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0285ff]/30 border-t-[#0285ff] rounded-full animate-spin" />
          <span className="text-2xs font-mono text-slate-500 uppercase tracking-widest">
            Synchronizing Ecosystem...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00050c] text-slate-100 font-sans py-4 sm:py-8 px-2 sm:px-4 flex flex-col justify-start">
      {/* Simulation Wrapper Frame */}
      <DeviceSimulator>
        <div className="w-full h-full bg-[#000814] flex flex-col justify-between">
          <main className="flex-1 w-full flex flex-col justify-start">
            {/* Show login/signup screen if no user and not choosing Guest mode */}
            {!user && !isGuest ? (
              <AuthScreen 
                onLoginSuccess={handleLoginSuccess}
                onContinueAsGuest={handleContinueAsGuest}
              />
            ) : (
              <>
                {currentPage === 'quiz' && (
                  <OnboardingQuiz
                    answers={answers}
                    setAnswers={setAnswers}
                    onSubmit={handleSubmitQuiz}
                    isLoading={isLoading}
                    skipDemographics={hasLoggedIn}
                  />
                )}

                {currentPage === 'recommendations' && topGoal && (
                  <GoalRecommendations
                    answers={answers}
                    topGoal={topGoal}
                    alternatives={alternatives}
                    onCommit={handleCommitGoal}
                    onReset={handleResetQuiz}
                    hasAI={hasAI}
                  />
                )}

                {currentPage === 'dashboard' && committedGoal && (
                  <DashboardSimulation
                    goal={committedGoal}
                    onReset={handleResetQuiz}
                    answers={answers}
                    onUpdateAnswers={handleUpdateAnswers}
                    user={user}
                    onSignOut={handleSignOut}
                    onOpenAuth={handleGoToAuth}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </DeviceSimulator>
    </div>
  );
}

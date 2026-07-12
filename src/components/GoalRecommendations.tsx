import React, { useState } from 'react';
import { Goal, QuizAnswers } from '../types';
import { RefreshCw, HelpCircle, Trophy, Sparkles, CheckCircle, ArrowRight, CornerDownRight } from 'lucide-react';
import { motion } from 'motion/react';

interface GoalRecommendationsProps {
  answers: QuizAnswers;
  topGoal: Goal;
  alternatives: Goal[];
  onCommit: (selectedGoal: Goal) => void;
  onReset: () => void;
  hasAI: boolean;
}

export default function GoalRecommendations({ answers, topGoal, alternatives, onCommit, onReset, hasAI }: GoalRecommendationsProps) {
  // Allow user to elevate alternative goals as their active choice
  const [activeGoal, setActiveGoal] = useState<Goal>(topGoal);
  const [restList, setRestList] = useState<Goal[]>(alternatives);

  const swapToActive = (selected: Goal) => {
    const previousActive = activeGoal;
    setActiveGoal(selected);
    const updatedAlts = restList.map((item) => (item.id === selected.id ? previousActive : item));
    setRestList(updatedAlts);
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Environment':
        return {
          card: 'relative bg-gradient-to-br from-[#042a20] via-[#021812] to-slate-950 text-white rounded-3xl p-6 border border-[#387667]/50 shadow-[0_0_20px_rgba(4,42,32,0.4)] overflow-hidden flex flex-col gap-6',
          pill: 'bg-[#387667]/30 text-emerald-200 border border-[#387667]/30',
          label: 'text-emerald-400',
          bgBox: 'bg-emerald-950/20 border-emerald-500/10'
        };
      case 'Well-Being':
        return {
          card: 'relative bg-gradient-to-br from-[#00172f] via-[#000f1f] to-slate-950 text-white rounded-3xl p-6 border border-[#0285ff]/50 shadow-[0_0_20px_rgba(2,133,255,0.4)] overflow-hidden flex flex-col gap-6',
          pill: 'bg-[#0285ff]/30 text-[#0285ff] border border-[#0285ff]/30',
          label: 'text-[#0285ff]',
          bgBox: 'bg-[#00172f]/20 border-[#0285ff]/10'
        };
      case 'Compassion':
        return {
          card: 'relative bg-gradient-to-br from-[#2a0c1f] via-[#14060f] to-slate-950 text-white rounded-3xl p-6 border border-[#c084fc]/50 shadow-[0_0_20px_rgba(192,132,252,0.4)] overflow-hidden flex flex-col gap-6',
          pill: 'bg-[#c084fc]/30 text-rose-200 border border-[#c084fc]/30',
          label: 'text-[#c084fc]',
          bgBox: 'bg-rose-950/20 border-rose-500/10'
        };
      case 'Responsible AI':
      default:
        return {
          card: 'relative bg-gradient-to-br from-[#110b29] via-[#090617] to-slate-950 text-white rounded-3xl p-6 border border-indigo-500/50 shadow-[0_0_20px_rgba(129,140,248,0.4)] overflow-hidden flex flex-col gap-6',
          pill: 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/30',
          label: 'text-indigo-400',
          bgBox: 'bg-indigo-950/20 border-indigo-500/10'
        };
    }
  };

  const catStyles = getCategoryStyles(activeGoal.category);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Dynamic Heading with success badges */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00172f] border border-[#002246] rounded-full text-[10px] font-mono font-bold tracking-widest text-[#0285ff] uppercase">
          <Trophy className="w-3.5 h-3.5 text-[#0285ff]" />
          WE FOUND YOUR PERFECT FIT!
        </div>
        <h2 className="text-2xl font-serif text-white font-bold tracking-tight sm:text-3xl">
          Your Personalized 3-Month Plan
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto font-sans">
          Based on your lifestyle and motivation, we selected the habits that will be easiest to build and make the biggest difference.
        </p>

        {hasAI ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-950/40 border border-indigo-500/20 rounded-lg text-[10px] font-sans font-semibold text-indigo-300">
            <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
            AI-Personalized Suggestion Engine Active
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-[#002246] rounded-lg text-[10px] font-sans font-semibold text-slate-300">
            Scientific Database Match Active
          </div>
        )}
      </div>

      {/* Main Top recommended card block */}
      <motion.div
        layout
        className={catStyles.card}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-12 translate-y-12"></div>

        {/* Header content in card */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 z-10">
          <div className="space-y-2.5 flex-1">
            <span className={`inline-block text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full ${catStyles.pill}`}>
              Your Top Habit Target
            </span>
            <h3 className="text-2xl font-serif text-white font-bold leading-tight">
              {activeGoal.title}
            </h3>
          </div>
          <div className="self-start sm:self-auto bg-slate-900/80 border border-slate-700/50 text-xs px-3 py-1 rounded-lg font-sans font-semibold text-slate-200 shrink-0">
            {activeGoal.category}
          </div>
        </div>

        {/* Recommended Daily Action Box */}
        <div className="bg-slate-950/80 border border-[#002246] rounded-2xl p-4 space-y-2 z-10">
          <h4 className={`text-xs uppercase font-mono font-bold tracking-wider ${catStyles.label}`}>
            Daily Action Item
          </h4>
          <p className="text-sm text-slate-100 leading-relaxed font-medium">
            {activeGoal.action}
          </p>
        </div>

        {/* PERSUASIVE 3-MONTH IMPACT */}
        <div className="space-y-3 z-10 border-t border-white/10 pt-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <h4 className={`text-xs uppercase font-mono font-bold tracking-wider ${catStyles.label}`}>
              Your 3-Month Environmental and Personal Impact
            </h4>
          </div>
          <div className="mt-1 bg-slate-950/40 p-4 rounded-xl border border-[#002246] space-y-4">
            {activeGoal.impact.split('\n\n').map((p, idx) => {
              const lines = p.split('\n');
              const firstLine = lines[0] || '';
              if (firstLine.startsWith('[') && firstLine.includes(']')) {
                const closingIndex = firstLine.indexOf(']');
                const label = firstLine.substring(1, closingIndex);
                const suffix = firstLine.substring(closingIndex + 1).trim();
                const restText = lines.slice(1).join('\n');
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`font-bold text-xs uppercase tracking-wider ${catStyles.label}`}>
                        {label}
                      </span>
                      {suffix && (
                        <span className="text-[10px] font-mono font-semibold text-slate-200 bg-slate-900 border border-[#002246] px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {suffix}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-100 leading-relaxed font-sans">
                      {restText}
                    </p>
                  </div>
                );
              }
              return (
                <p key={idx} className="text-sm text-slate-100 leading-relaxed font-sans">
                  {p}
                </p>
              );
            })}
          </div>
        </div>

        {/* Call to Active sign commit buttons */}
        <div className="z-10 pt-2 shrink-0">
          <button
            id="commit-challenge-btn"
            onClick={() => onCommit(activeGoal)}
            className="w-full bg-white hover:bg-slate-200 text-slate-950 font-sans font-bold text-sm py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
          >
            I'm ready! Commit to this 3-Month Habit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Small detail of personalization validation */}
        <div className="text-center text-3xs font-mono text-slate-400 uppercase tracking-widest leading-loose">
          Specifically optimized for: {answers.categories.join(' & ')} • {answers.livingArrangement}
        </div>
      </motion.div>

      {/* Alternative selections */}
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            Explore other options in {answers.categories.join(' & ')}
          </h4>
          <p className="text-2xs text-slate-500">
            Want to try a different direction? Tap any habit below to swap it with your primary focus.
          </p>
        </div>

        <div className="space-y-3">
          {restList.map((alt) => (
            <button
              key={alt.id}
              id={`alt-elevate-btn-${alt.id}`}
              onClick={() => swapToActive(alt)}
              className="w-full p-4 bg-slate-950 hover:bg-[#000f1f] border border-[#002246] rounded-2xl text-left transition-all hover:border-[#00488A] flex items-start gap-4 group"
            >
              <div className="p-2.5 rounded-xl bg-slate-900 shrink-0 text-slate-400 group-hover:bg-[#00172f] group-hover:text-[#0285ff] border border-[#002246] group-hover:border-[#0285ff]/30 transition-all">
                <CornerDownRight className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-sans font-bold text-white truncate">
                    {alt.title}
                  </h5>
                  <span className="text-[9px] font-mono font-semibold tracking-wider text-[#0285ff] bg-[#00172f] border border-[#002246] px-2 py-0.5 rounded uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    TAP TO SELECT & SWAP
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-300 leading-snug">
                  {alt.action}
                </p>
                <div className="text-2xs text-slate-400 leading-relaxed line-clamp-2">
                  {(() => {
                    const parts = alt.impact.split('\n\n');
                    const firstPart = parts[0] || '';
                    const lines = firstPart.split('\n');
                    const labelLine = lines[0] || '';
                    const contentText = lines.slice(1).join(' ');
                    
                    if (labelLine.startsWith('[IMPACT]') || labelLine.includes('[IMPACT]')) {
                      const labelText = labelLine
                        .replace('[IMPACT]', 'Impact')
                        .trim();
                      return (
                        <>
                          <span className="font-semibold text-slate-200">{labelText}: </span>
                          <span>{contentText}</span>
                        </>
                      );
                    }
                    return alt.impact;
                  })()}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Redo or reset quiz button */}
      <div className="flex justify-center pt-4 shrink-0">
        <button
          id="redo-quiz-btn"
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2 font-sans font-bold text-xs text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl border border-[#002246] hover:border-[#00488A] transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Redo Onboarding Questions
        </button>
      </div>
    </div>
  );
}

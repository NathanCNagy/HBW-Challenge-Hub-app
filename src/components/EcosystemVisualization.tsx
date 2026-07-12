import React, { useState, useEffect } from 'react';
import { Trophy, ShieldCheck, Heart, Sparkles, Award, Zap, Users, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EcosystemVisualizationProps {
  category: 'Environment' | 'Well-Being' | 'Compassion' | 'Responsible AI';
  streak: number;
  individualEnergy: number;
  setIndividualEnergy: React.Dispatch<React.SetStateAction<number>>;
  hasLoggedToday: boolean;
  onLogToday: () => void;
  goalTitle: string;
  bubbles: { id: number; cx: number; cy: number; value: number; type: string; label: string; isNew?: boolean }[];
  setBubbles: React.Dispatch<React.SetStateAction<{ id: number; cx: number; cy: number; value: number; type: string; label: string; isNew?: boolean }[]>>;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number; // streak needed to unlock
  isGroup: boolean;
}

export default function EcosystemVisualization({
  category,
  streak,
  individualEnergy,
  setIndividualEnergy,
  hasLoggedToday,
  onLogToday,
  goalTitle,
  bubbles,
  setBubbles
}: EcosystemVisualizationProps) {
  const [activeBadge, setActiveBadge] = useState<Badge | null>(null);

  const handlePopBubble = (id: number, value: number) => {
    setIndividualEnergy(prev => prev + value);
    setBubbles(prev => prev.filter(b => b.id !== id));
  };

  // Badge list with milestones
  const badges: Badge[] = [
    { id: 'b-1', name: 'Seedling Committer', description: 'Log your first habit activity to establish your ecosystem seed.', icon: '🌱', unlockedAt: 1, isGroup: false },
    { id: 'b-2', name: 'Anchor Trailblazer', description: 'Successfully trigger your micro habit consistently for 7 consecutive days.', icon: '⚡', unlockedAt: 7, isGroup: false },
    { id: 'b-3', name: 'Ecosystem Master', description: 'Achieve a 14-day streak, nurturing your local node and reclaiming focus.', icon: '💎', unlockedAt: 14, isGroup: false },
    { id: 'b-4', name: '90-Day Visionary', description: 'Complete 21+ days toward your 90-day systemic personal transformation.', icon: '👑', unlockedAt: 21, isGroup: false },
    { id: 'g-1', name: 'Forest of Cooperation', description: 'Your challenge group collective score exceeds 500k actions.', icon: '🌳', unlockedAt: 1, isGroup: true },
    { id: 'g-2', name: 'Systemic Slasher Alliance', description: 'The challenge group collective carbon reduction surpasses 50,000 kg.', icon: '🌍', unlockedAt: 7, isGroup: true },
  ];

  // Group stats mapped to categories
  const groupStats = {
    'Environment': {
      groupName: 'The Plant-Forward Kitchen & Active Travelers',
      subgroup: 'Environmental Challenge Group',
      activeMembers: '24,198',
      collectiveScore: 762340 + streak * 140,
      resourceLabel: 'CO2 emissions offset',
      resourceValue: `${(125480 + (individualEnergy * 2.3)).toLocaleString(undefined, { maximumFractionDigits: 0 })} kg`,
      visualColor: 'from-[#0285ff]/30 to-emerald-500/20'
    },
    'Well-Being': {
      groupName: 'Universal Vitality & Digital Mindfulness',
      subgroup: 'Well-Being Challenge Group',
      activeMembers: '18,402',
      collectiveScore: 341200 + streak * 98,
      resourceLabel: 'Focused hours reclaimed',
      resourceValue: `${(48910 + (individualEnergy * 0.4)).toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs`,
      visualColor: 'from-[#0285ff]/30 to-indigo-500/20'
    },
    'Compassion': {
      groupName: 'Everyday Kindness & Food Security allies',
      subgroup: 'Kindness Challenge Group',
      activeMembers: '15,221',
      collectiveScore: 182340 + streak * 74,
      resourceLabel: 'Stranger interactions & support logs',
      resourceValue: `${(54290 + individualEnergy).toLocaleString()} acts`,
      visualColor: 'from-[#0285ff]/30 to-pink-500/20'
    },
    'Responsible AI': {
      groupName: 'Cognitive Integrity & AI Fact-Checkers',
      subgroup: 'Mindful AI Challenge Group',
      activeMembers: '9,812',
      collectiveScore: 98420 + streak * 52,
      resourceLabel: 'Server compute cycles saved',
      resourceValue: `${(5400000 + (individualEnergy * 150)).toLocaleString()} units`,
      visualColor: 'from-[#0285ff]/30 to-teal-500/20'
    }
  }[category];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Mini Interactive Onboarding Tip */}
      <div className="p-3 bg-[#000f1f]/80 border border-[#002246] rounded-2xl flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#0285ff] shrink-0 mt-0.5 animate-pulse" />
        <div className="space-y-0.5 flex-1">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#0285ff] block">How it works</span>
          <p className="text-[10px] text-slate-300 leading-normal font-sans">
            Tick off your daily habits on the <strong>Pulse</strong> tab to nourish your tree. When energy bubbles sprout, tap them to collect Habit Energy (<Zap className="inline w-2.5 h-2.5 text-[#0285ff] fill-[#0285ff]" />) and grow your forest!
          </p>
        </div>
      </div>

      {/* Interactive Alipay-Style Ant Forest Stage */}
      <div className="relative w-full h-[320px] bg-slate-950 border border-[#002246] rounded-3xl overflow-hidden flex flex-col justify-between p-4 shadow-inner">
        {/* Dynamic visual overlay corresponding to category */}
        <div className={`absolute inset-0 bg-gradient-to-b ${groupStats.visualColor} opacity-25 pointer-events-none`} />

        {/* Top Header stats overlay */}
        <div className="flex justify-between items-start z-10">
          <div className="space-y-0.5 bg-black/40 backdrop-blur-xs p-2 rounded-xl border border-[#002246]/50">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">MY HABIT ENERGY</span>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#0285ff] fill-[#0285ff]" />
              <span className="text-base font-serif font-bold text-white">{individualEnergy} g</span>
            </div>
          </div>

          <div className="text-right space-y-0.5 bg-black/40 backdrop-blur-xs p-2 rounded-xl border border-[#002246]/50">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">GROUP PROGRESS</span>
            <div className="flex items-center gap-1 justify-end">
              <Users className="w-3.5 h-3.5 text-[#0285ff]" />
              <span className="text-xs font-sans font-bold text-slate-200">Level {Math.floor(groupStats.collectiveScore / 100000)}</span>
            </div>
          </div>
        </div>

        {/* Floating Interactive Energy Drops (Bubbles) */}
        <div className="absolute inset-x-0 top-16 bottom-20 z-20 overflow-visible pointer-events-none">
          <AnimatePresence>
            {bubbles.map((bubble) => (
              <div
                key={bubble.id}
                style={{ left: `${bubble.cx}%`, top: `${bubble.cy}%`, transform: 'translate(-50%, -50%)' }}
                className="absolute z-20 pointer-events-auto"
              >
                <motion.button
                  initial={{ scale: 0, y: 15, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    y: [0, -6, 0], 
                    opacity: 0.95,
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 3 + (bubble.id % 2) * 1.5,
                        ease: "easeInOut"
                      }
                    }
                  }}
                  exit={{ scale: 2, opacity: 0, transition: { duration: 0.25 } }}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => handlePopBubble(bubble.id, bubble.value)}
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr from-[#0285ff]/80 to-sky-300/40 border flex flex-col items-center justify-center cursor-pointer text-center text-white select-none transition-all ${
                    bubble.isNew 
                      ? 'border-yellow-400/90 shadow-[0_0_20px_rgba(250,204,21,0.8)] ring-2 ring-yellow-400/20' 
                      : 'border-white/30 shadow-[0_0_15px_rgba(2,133,255,0.5)]'
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold leading-none flex items-center justify-center gap-0.5">
                    +{bubble.value}g
                  </span>
                  <span className="text-[6px] font-sans scale-85 uppercase font-extrabold text-sky-100 tracking-wider block max-w-[40px] truncate leading-none mt-0.5">
                    {bubble.type}
                  </span>
                  {bubble.isNew && (
                    <span className="absolute -top-1 -right-1 text-[7px] font-mono bg-yellow-400 text-slate-950 font-bold px-1 rounded-full leading-none py-0.5 uppercase tracking-wide animate-pulse scale-90">
                      NEW
                    </span>
                  )}
                </motion.button>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* The Growth Visual Tree / Plant */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none z-10">
          <svg width="220" height="150" viewBox="0 0 220 150" className="drop-shadow-[0_0_15px_rgba(2,133,255,0.25)]">
            {/* Ground */}
            <path d="M 20 140 Q 110 120 200 140 Q 110 155 20 140" fill="#00152e" stroke="#002d5c" strokeWidth="1" />
            
            {/* Trunk / Base stem - height and stroke thickness grow with streak */}
            <path 
              d={`M 110 140 Q ${110 + Math.sin(streak) * 5} ${120 - streak * 1} 110 ${140 - Math.min(20 + streak * 4, 90)}`} 
              stroke="#0a5fb4" 
              strokeWidth={Math.min(3 + streak * 0.4, 10)} 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* Left Branch */}
            {streak >= 3 && (
              <path 
                d={`M 110 ${140 - Math.min(10 + streak * 2, 45)} Q 90 ${130 - streak * 2.5} 80 ${120 - Math.min(10 + streak * 1.5, 40)}`} 
                stroke="#0a5fb4" 
                strokeWidth={Math.min(2 + streak * 0.2, 5)} 
                strokeLinecap="round" 
                fill="none" 
              />
            )}

            {/* Right Branch */}
            {streak >= 5 && (
              <path 
                d={`M 110 ${140 - Math.min(20 + streak * 2, 55)} Q 130 ${125 - streak * 2} 140 ${115 - Math.min(15 + streak * 1.2, 45)}`} 
                stroke="#0a5fb4" 
                strokeWidth={Math.min(1.5 + streak * 0.2, 4.5)} 
                strokeLinecap="round" 
                fill="none" 
              />
            )}

            {/* Foliage / Leaves - size and color gradient shift based on streak/level */}
            {/* Center Main Leaf */}
            <path 
              d={`M 110 ${140 - Math.min(20 + streak * 4, 90)} C 100 ${115 - streak * 4} 100 ${100 - streak * 4} 110 ${90 - Math.min(streak * 2.2, 40)} C 120 ${100 - streak * 4} 120 ${115 - streak * 4} 110 ${140 - Math.min(20 + streak * 4, 90)}`} 
              fill={streak >= 7 ? "#0285ff" : "#004f9e"} 
              opacity="0.85" 
            />

            {/* Secondary leaves */}
            {streak >= 4 && (
              <circle cx="80" cy={120 - Math.min(10 + streak * 1.5, 40)} r={Math.min(4 + streak * 0.6, 12)} fill="#0075e3" opacity="0.8" />
            )}
            {streak >= 6 && (
              <circle cx="140" cy={115 - Math.min(15 + streak * 1.2, 45)} r={Math.min(3 + streak * 0.6, 11)} fill="#3ca1ff" opacity="0.85" />
            )}
            {streak >= 10 && (
              <circle cx="95" cy="85" r="9" fill="#9cd0ff" opacity="0.9" />
            )}
            {streak >= 14 && (
              <circle cx="125" cy="75" r="10" fill="#ffffff" opacity="0.95" className="animate-pulse" />
            )}

            {/* Sparkles / Magic nodes around growing tree */}
            <circle cx="110" cy="45" r="1.5" fill="#fff" className="animate-ping" />
            <circle cx="70" cy="75" r="1" fill="#0285ff" />
            <circle cx="150" cy="80" r="1" fill="#9cd0ff" />
          </svg>
        </div>

        {/* Bottom banner warning and hints */}
        <div className="absolute inset-x-0 bottom-1.5 flex flex-col items-center justify-center z-10 px-4 text-center pb-0.5">
          <p className="text-[9.5px] text-slate-300 font-sans font-semibold tracking-wide flex flex-col sm:flex-row items-center gap-1 bg-slate-950/80 px-3 py-1 rounded-full border border-[#002246]/60 backdrop-blur-xs">
            <span className={hasLoggedToday ? "text-[#0285ff]" : "text-amber-400"}>
              {hasLoggedToday ? "💧 Ecosystem watered!" : "🌱 Nurture your tree today!"}
            </span>
            <span className="text-slate-400 sm:before:content-['•'] sm:before:mx-1">
              Tap the floating bubbles to harvest energy!
            </span>
          </p>
        </div>
      </div>

      {/* Gamified Impact Progress Indicators */}
      <div className="p-4 bg-slate-950 border border-[#002246] rounded-2xl flex flex-col gap-3">
        <div className="flex justify-between items-center border-b border-[#002246]/50 pb-2">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-[#0285ff]" />
            <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider">
              Our Community Challenge
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">90-Day Campaign</span>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-slate-200 font-bold leading-tight">
            {groupStats.groupName}
          </p>
          <p className="text-[10px] text-slate-400 font-sans leading-normal">
            Your daily {goalTitle} habit supports this group. The combined effort creates systemic change.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-2.5 bg-[#000f1f] border border-[#002246] rounded-xl text-center space-y-0.5">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">GROUP ACTIVE INDEX</span>
            <span className="text-sm font-serif text-[#0285ff] font-bold block">
              {groupStats.collectiveScore.toLocaleString()} pts
            </span>
          </div>

          <div className="p-2.5 bg-[#000f1f] border border-[#002246] rounded-xl text-center space-y-0.5">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">{groupStats.resourceLabel.toUpperCase()}</span>
            <span className="text-sm font-serif text-white font-bold block">
              {groupStats.resourceValue}
            </span>
          </div>
        </div>
      </div>

      {/* Badges / Milestones section */}
      <div className="p-4 bg-slate-950 border border-[#002246] rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#0285ff]" />
            My Badges & Milestones
          </h4>
          <span className="text-2xs font-mono text-slate-400">Streak: {streak} days</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {badges.map((badge) => {
            const isUnlocked = streak >= badge.unlockedAt;
            return (
              <button
                key={badge.id}
                onClick={() => setActiveBadge(badge)}
                className={`relative p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                  isUnlocked
                    ? 'bg-[#000f1f] border-[#002246] hover:border-[#0285ff]/50'
                    : 'bg-black/40 border-[#002246]/20 opacity-40 hover:opacity-50'
                }`}
              >
                <span className="text-2xl block select-none">{isUnlocked ? badge.icon : '🔒'}</span>
                <span className="text-[9px] text-slate-300 font-sans font-semibold leading-none truncate w-full block">
                  {badge.name.split(' ')[0]}
                </span>
                {badge.isGroup && (
                  <span className="absolute -top-1 -right-1 text-[8px] font-bold font-mono px-1 bg-[#0285ff] text-white rounded-full scale-80 leading-tight">
                    GP
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Badge detail interactive modal overlay */}
      <AnimatePresence>
        {activeBadge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-[#000f1f] border border-[#002246] rounded-2xl max-w-xs w-full p-5 space-y-4 shadow-xl text-center"
            >
              <div className="w-16 h-16 bg-[#00172f] border border-[#002246] rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner">
                {streak >= activeBadge.unlockedAt ? activeBadge.icon : '🔒'}
              </div>
              
              <div className="space-y-1">
                <span className="text-3xs font-mono font-bold uppercase tracking-widest text-[#0285ff]">
                  {activeBadge.isGroup ? 'GROUP REWARD' : 'INDIVIDUAL BADGE'}
                </span>
                <h4 className="text-base font-serif font-bold text-white">{activeBadge.name}</h4>
                <p className="text-2xs text-slate-400 font-sans leading-normal">
                  {activeBadge.description}
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <div className="text-3xs font-mono text-slate-500 bg-black/40 py-1.5 px-3 rounded-lg border border-[#002246]/50">
                  {streak >= activeBadge.unlockedAt 
                    ? `🏆 UNLOCKED · Level verified` 
                    : `🔒 LOCKED · Requires ${activeBadge.unlockedAt} day streak`}
                </div>
                
                <button
                  onClick={() => setActiveBadge(null)}
                  className="w-full py-1.5 bg-[#002246] hover:bg-[#0285ff] text-white font-sans text-xs font-bold rounded-xl border border-[#00488A]/50 transition-colors"
                >
                  Close Detail
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

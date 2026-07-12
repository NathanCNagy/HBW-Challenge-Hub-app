import React, { useState } from 'react';
import { Goal, Category } from '../types';
import { STATIC_GOALS } from '../data';
import { AlertTriangle, Plus, Check, ShieldAlert, Sparkles, BookOpen, Trash2, RotateCcw } from 'lucide-react';

interface HabitsManagerProps {
  activeGoal: Goal;
  setActiveGoal: (goal: Goal) => void;
  onResetQuiz: () => void;
}

export default function HabitsManager({ activeGoal, setActiveGoal, onResetQuiz }: HabitsManagerProps) {
  // Store multiple chosen habits. Initially contains the onboarding-committed habit.
  const [chosenHabits, setChosenHabits] = useState<Goal[]>([activeGoal]);
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('Environment');

  // Add a habit to the active wardrobe
  const handleAddHabit = (goal: Goal) => {
    if (chosenHabits.some(g => g.id === goal.id)) return;
    setChosenHabits([...chosenHabits, goal]);
  };

  // Remove habit from wardrobe (ensure we keep at least one)
  const handleRemoveHabit = (id: string) => {
    if (chosenHabits.length <= 1) return;
    const filtered = chosenHabits.filter(g => g.id !== id);
    setChosenHabits(filtered);
    
    // If the active goal was the removed one, fallback to the first remaining one
    if (activeGoal.id === id) {
      setActiveGoal(filtered[0]);
    }
  };

  const handleMakeActive = (goal: Goal) => {
    setActiveGoal(goal);
  };

  const allCategories: Category[] = ['Environment', 'Well-Being', 'Compassion', 'Responsible AI'];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Behaviour Science Caution Banner */}
      <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400">
            Focus on one habit at a time
          </h4>
          <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
            Behavioral science shows that focusing on a single small habit makes you <strong>80% more likely to succeed</strong>. Master your primary habit before taking on more! Focus your energy and attention on your main goal.
          </p>
        </div>
      </div>

      {/* Currently Active & Selected Habits wardrobe */}
      <div className="p-4 bg-slate-950 border border-[#002246] rounded-2xl flex flex-col gap-3">
        <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider">
          Habits Wardrobe
        </h4>
        
        <div className="space-y-2.5">
          {chosenHabits.map((habit) => {
            const isActive = activeGoal.id === habit.id;
            return (
              <div 
                key={habit.id}
                className={`p-3 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all ${
                  isActive 
                    ? 'bg-[#000f1f] border-[#0285ff] shadow-[0_0_10px_rgba(2,133,255,0.15)]' 
                    : 'bg-black/40 border-[#002246]/60'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 px-1.5 py-0.5 bg-slate-900 border border-[#002246] rounded-md">
                      {habit.category}
                    </span>
                    {isActive && (
                      <span className="text-[8px] font-mono font-bold text-[#0285ff] bg-[#00172f] border border-[#002246] px-1.5 py-0.5 rounded-md animate-pulse">
                        ● PRIMARY ACTIVE FOCUS
                      </span>
                    )}
                  </div>
                  <h5 className="font-serif font-bold text-white text-xs leading-tight">{habit.title}</h5>
                  <p className="text-[10px] text-slate-300 font-sans leading-normal">{habit.action}</p>
                </div>

                <div className="flex gap-1.5 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#002246]/40 pt-2 sm:pt-0">
                  {!isActive && (
                    <button
                      onClick={() => handleMakeActive(habit)}
                      className="px-2.5 py-1.5 bg-[#002246] hover:bg-[#00488A] text-slate-200 font-sans text-[10px] font-semibold rounded-lg border border-[#00488A]/50 transition-colors"
                    >
                      Make Focus
                    </button>
                  )}
                  {chosenHabits.length > 1 && (
                    <button
                      onClick={() => handleRemoveHabit(habit.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors"
                      title="Remove from wardrobe"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Warning if multiple habits are added to wardrobe */}
        {chosenHabits.length > 1 && (
          <div className="p-2 bg-amber-950/20 border border-amber-500/20 rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-[9px] text-amber-300 leading-tight">
              Notice: You are tracking {chosenHabits.length} habits. We highly recommend focusing your energy on your <strong>primary</strong> habit today.
            </p>
          </div>
        )}

        {/* Options to add a new habit: redoing the quiz or browsing habits */}
        <div className="border-t border-[#002246]/50 pt-3 mt-1.5 space-y-2">
          <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block text-center font-bold">
            Add a New Habit
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowCatalog(!showCatalog)}
              className={`py-2 text-2xs font-sans font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 border active:scale-95 cursor-pointer ${
                showCatalog 
                  ? 'bg-[#0285ff] text-white border-[#0285ff]' 
                  : 'bg-[#002246] hover:bg-[#00488A] text-[#0285ff] border-[#00488A]/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showCatalog ? 'Close Catalog' : 'Browse'}</span>
            </button>
            <button
              onClick={onResetQuiz}
              className="py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60 font-sans text-2xs font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#0285ff]" />
              <span>Redo Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out / Collapsible Habits catalogue */}
      {showCatalog && (
        <div className="p-4 bg-slate-950 border border-[#002246] rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-1.5 border-b border-[#002246]/50 pb-2">
            <BookOpen className="w-4 h-4 text-[#0285ff]" />
            <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider">
              Habits Collection
            </h4>
          </div>

          {/* Horizontal Category Pill Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 shrink-0">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-tight rounded-lg shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0285ff] text-white'
                    : 'bg-[#000f1f] text-slate-400 hover:text-slate-200 border border-[#002246]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List of goals in category */}
          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
            {STATIC_GOALS[selectedCategory].map((goal) => {
              const alreadyChosen = chosenHabits.some(g => g.id === goal.id);
              return (
                <div 
                  key={goal.id} 
                  className="p-2.5 bg-[#000f1f] border border-[#002246]/50 rounded-xl flex items-start justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <h6 className="font-serif font-bold text-white text-[11px] leading-tight">{goal.title}</h6>
                    <p className="text-[9px] text-slate-300 font-sans leading-normal">{goal.action}</p>
                  </div>

                  <button
                    disabled={alreadyChosen}
                    onClick={() => handleAddHabit(goal)}
                    className={`p-1 rounded-lg transition-all shrink-0 ${
                      alreadyChosen
                        ? 'text-emerald-500 bg-emerald-950/20 border border-emerald-500/20 cursor-default'
                        : 'text-slate-400 bg-slate-900 border border-[#002246] hover:text-white hover:border-[#0285ff]'
                    }`}
                  >
                    {alreadyChosen ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

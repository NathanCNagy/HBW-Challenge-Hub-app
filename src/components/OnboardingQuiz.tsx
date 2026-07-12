import React, { useState } from 'react';
import { QuizAnswers, Category } from '../types';
import { Leaf, Heart, Users, Brain, CornerDownRight, ArrowRight, ArrowLeft, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingQuizProps {
  answers: QuizAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<QuizAnswers>>;
  onSubmit: () => void;
  isLoading: boolean;
  skipDemographics?: boolean;
}

export default function OnboardingQuiz({ answers, setAnswers, onSubmit, isLoading, skipDemographics = false }: OnboardingQuizProps) {
  const [step, setStep] = useState<number>(skipDemographics ? 2 : 1);

  // Validate inputs for each step to handle visual disables
  const isStep1Valid = answers.age.trim() !== '' && answers.gender !== '';
  const isStep2Valid = answers.categories && answers.categories.length === 1;
  const isStep3Valid = 
    answers.livingArrangement !== '' &&
    answers.primaryConstraint && answers.primaryConstraint.length >= 1 && answers.primaryConstraint.length <= 2;

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      onSubmit();
    }
  };

  const handleBack = () => {
    const minStep = skipDemographics ? 2 : 1;
    if (step > minStep) {
      setStep((prev) => prev - 1);
    }
  };

  // Predefined lists for answers
  const genderOptions = ['Male', 'Female', 'Non-binary / Other', 'Prefer not to say'];
  
  const categories: { name: Category; description: string; icon: React.ReactNode; color: string; bg: string; border: string; selectedBg: string }[] = [
    {
      name: 'Environment',
      description: 'Protect our planet. Save water, reduce waste, and cut carbon emissions with simple, daily actions.',
      icon: <Leaf className="w-6 h-6" />,
      color: 'text-[#387667]',
      bg: 'bg-[#042a20]/30',
      border: 'border-[#387667]/30',
      selectedBg: 'border-[#387667] bg-[#042a20]/90 text-white ring-2 ring-[#387667]/20'
    },
    {
      name: 'Well-Being',
      description: 'Nurture your body and mind. Improve your sleep, move more, and build daily mental resilience.',
      icon: <Brain className="w-6 h-6" />,
      color: 'text-[#0285ff]',
      bg: 'bg-[#00132b]/30',
      border: 'border-[#0285ff]/30',
      selectedBg: 'border-[#0285ff] bg-[#00132b]/90 text-white ring-2 ring-[#0285ff]/20'
    },
    {
      name: 'Compassion',
      description: 'Spread kindness. Build stronger connections, support your neighbors, and brighten someone\'s day.',
      icon: <Heart className="w-6 h-6" />,
      color: 'text-[#c084fc]',
      bg: 'bg-[#2a0c1f]/30',
      border: 'border-[#c084fc]/30',
      selectedBg: 'border-[#c084fc] bg-[#2a0c1f]/90 text-white ring-2 ring-[#c084fc]/20'
    },
    {
      name: 'Responsible AI',
      description: 'Use AI mindfully. Balance screen time, verify online facts, and save computing energy.',
      icon: <Users className="w-6 h-6" />,
      color: 'text-indigo-400',
      bg: 'bg-[#110b29]/30',
      border: 'border-indigo-500/30',
      selectedBg: 'border-indigo-500 bg-[#110b29]/90 text-white ring-2 ring-indigo-500/20'
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col justify-center min-h-[500px]">
      {/* Dynamic progress step line */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs font-mono font-bold tracking-widest text-[#0285ff]">
          HABITS FOR A BETTER WORLD ONBOARDING
        </span>
        <div className="flex items-center gap-1">
          {(skipDemographics ? [2, 3] : [1, 2, 3]).map((num) => (
            <div
              key={num}
              className={`w-10 h-1.5 rounded-full transition-all duration-300 ${
                num <= step ? 'bg-[#0285ff] shadow-[0_0_8px_rgba(2,133,255,0.4)]' : 'bg-[#001124] border border-[#002246]'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-white font-semibold tracking-tight sm:text-3xl">
                Let's start with the basics
              </h2>
              <p className="text-sm text-slate-300">
                We'll use your age and gender to personalize your habit suggestions and calculate your real-world positive impact.
              </p>
            </div>

            {/* Age input card */}
            <div className="p-5 bg-slate-950 border border-[#002246] rounded-2xl space-y-4">
              <label className="text-sm font-sans font-semibold text-slate-200 flex items-center gap-2">
                What is your age?
              </label>
              <div className="flex items-center gap-2 max-w-xs">
                <div className="relative flex-1">
                  <input
                    id="onboarding-age-input"
                    type="text"
                    value={answers.age}
                    onChange={(e) => setAnswers({ ...answers, age: e.target.value })}
                    placeholder="e.g. 28"
                    className="w-full px-4 py-3 border border-[#002246] rounded-xl font-sans font-semibold bg-[#000f1f] text-white placeholder-slate-500 focus:bg-[#00172f] focus:outline-none focus:ring-2 focus:ring-[#0285ff]"
                  />
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const val = parseInt(answers.age) || 28;
                      setAnswers({ ...answers, age: (val + 1).toString() });
                    }}
                    className="p-1 bg-[#000f1f] hover:bg-[#00172f] border border-[#002246] text-slate-300 rounded-lg transition-all active:scale-90"
                    aria-label="Increase age"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const val = parseInt(answers.age) || 28;
                      if (val > 1) {
                        setAnswers({ ...answers, age: (val - 1).toString() });
                      }
                    }}
                    className="p-1 bg-[#000f1f] hover:bg-[#00172f] border border-[#002246] text-slate-300 rounded-lg transition-all active:scale-90"
                    aria-label="Decrease age"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Gender input card */}
            <div className="p-5 bg-slate-950 border border-[#002246] rounded-2xl space-y-4">
              <label className="text-sm font-sans font-semibold text-slate-200">
                What is your gender?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {genderOptions.map((g) => (
                  <button
                    key={g}
                    id={`gender-btn-${g.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setAnswers({ ...answers, gender: g })}
                    type="button"
                    className={`px-4 py-3 border rounded-xl font-sans text-sm font-semibold transition-all duration-200 flex items-center justify-between text-left ${
                      answers.gender === g
                        ? 'border-[#0285ff] bg-[#00172f] text-white ring-2 ring-[#0285ff]/20'
                        : 'border-[#002246] hover:border-[#00488A] bg-[#000f1f] text-slate-300'
                    }`}
                  >
                    <span>{g}</span>
                    {answers.gender === g && (
                      <span className="w-2 h-2 rounded-full bg-[#0285ff]"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-white font-semibold tracking-tight sm:text-3xl">
                Choose your main focus
              </h2>
              <p className="text-sm text-slate-300">
                Which area of your life would you like to nurture over the next 3 months? Pick <strong className="text-[#0285ff]">one focus area</strong> to begin.
              </p>
            </div>

            {/* Category selection grid */}
            <div className="grid grid-cols-1 gap-4">
              {categories.map((c) => {
                const isSelected = (answers.categories || []).includes(c.name);
                const handleToggle = () => {
                  setAnswers({
                    ...answers,
                    categories: [c.name]
                  });
                };

                return (
                  <button
                    key={c.name}
                    id={`category-btn-${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={handleToggle}
                    type="button"
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                      isSelected
                        ? c.selectedBg
                        : 'border-[#002246] hover:border-[#00488A] bg-[#000f1f] text-slate-300'
                    }`}
                  >
                    <div className={`p-3 rounded-xl shrink-0 ${isSelected ? 'bg-slate-900/60 border border-current shadow-md' : 'bg-slate-900'} ${c.color}`}>
                      {c.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-sans font-bold text-white">{c.name}</h3>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-mono font-semibold tracking-widest bg-[#0285ff] text-white px-2 py-0.5 rounded-full">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-semibold text-center text-slate-400 bg-slate-950 py-3 px-4 rounded-xl border border-dashed border-[#002246]">
              Selected focus pillar: <span className="text-[#0285ff]">{(answers.categories || []).join(', ') || 'None selected (choose exactly one area)'}</span>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6 pb-2"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-white font-semibold tracking-tight sm:text-3xl animate-fade-in">
                Set up for success
              </h2>
              <p className="text-sm text-slate-300">
                Habits stick when they are easy to start and fit your natural daily routine. Let's customize yours!
              </p>
            </div>

            {/* Helper toggle logic for multiple selections */}
            {(() => {
              const handleToggleMulti = (field: 'timeCommitment' | 'motivation' | 'friction' | 'primaryConstraint', value: string, max: number) => {
                const currentList = answers[field] || [];
                if (currentList.includes(value)) {
                  setAnswers({
                    ...answers,
                    [field]: currentList.filter((item) => item !== value)
                  });
                } else {
                  if (currentList.length < max) {
                    setAnswers({
                      ...answers,
                      [field]: [...currentList, value]
                    });
                  }
                }
              };

              return (
                <>


                  {/* Habit parameter 5: Living Arrangement */}
                  <div className="p-5 bg-slate-950 border border-[#002246] rounded-2xl space-y-3">
                    <label className="text-sm font-sans font-bold text-slate-200 flex items-center gap-2">
                      <CornerDownRight className="w-4 h-4 text-[#0285ff]" />
                      What is your living setup? <span className="text-2xs font-mono font-medium text-[#0285ff] bg-[#00172f] border border-[#002246] px-2 py-0.5 rounded-full uppercase tracking-wider">Select 1</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Living with family / children',
                        'Shared household / roommates',
                        'Living alone / Single',
                        'Multigenerational home / Caretaker'
                      ].map((la) => (
                        <button
                          key={la}
                          id={`la-btn-${la.substring(0, 10).toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setAnswers({ ...answers, livingArrangement: la })}
                          type="button"
                          className={`px-3 py-2.5 text-xs font-semibold rounded-xl border text-left leading-normal flex items-center justify-between transition-all ${
                            answers.livingArrangement === la
                              ? 'border-[#0285ff] bg-[#00172f] text-white ring-1 ring-[#0285ff]/20'
                              : 'border-[#002246] bg-[#000f1f] text-slate-300 hover:border-[#00488A]'
                          }`}
                        >
                          <span>{la}</span>
                          {answers.livingArrangement === la && <span className="w-1.5 h-1.5 rounded-full bg-[#0285ff] shrink-0 ml-2"></span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Habit parameter 6: Primary Lifestyle Focus / Constraint */}
                  <div className="p-5 bg-slate-950 border border-[#002246] rounded-2xl space-y-3">
                    <label className="text-sm font-sans font-bold text-slate-200 flex items-center gap-2">
                      <CornerDownRight className="w-4 h-4 text-[#0285ff]" />
                      What is your main lifestyle constraint? <span className="text-2xs font-mono font-medium text-[#0285ff] bg-[#00172f] border border-[#002246] px-2 py-0.5 rounded-full uppercase tracking-wider">Select up to 2</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Extremely busy schedule & limited energy',
                        'Thrifty budget / Cost constraints',
                        'Small living quarters (apartment, no yard)',
                        'Focusing on physical fitness & keeping in shape'
                      ].map((pc) => {
                        const isSel = (answers.primaryConstraint || []).includes(pc);
                        return (
                          <button
                            key={pc}
                            id={`pc-btn-${pc.substring(0, 10).toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => handleToggleMulti('primaryConstraint', pc, 2)}
                            type="button"
                            className={`px-3 py-2.5 text-xs font-semibold rounded-xl border text-left leading-normal flex items-center justify-between transition-all ${
                              isSel
                                ? 'border-[#0285ff] bg-[#00172f] text-white ring-1 ring-[#0285ff]/20'
                                : 'border-[#002246] bg-[#000f1f] text-slate-300 hover:border-[#00488A]'
                            }`}
                          >
                            <span>{pc}</span>
                            {isSel && <span className="w-1.5 h-1.5 rounded-full bg-[#0285ff] shrink-0 ml-2 animate-pulse"></span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button navigation section */}
      <div className="mt-8 flex items-center justify-between pt-4 border-t border-[#002246] shrink-0">
        <button
          id="back-btn"
          onClick={handleBack}
          disabled={(skipDemographics ? step === 2 : step === 1) || isLoading}
          className={`flex items-center gap-1.5 px-4 py-2 font-sans font-bold text-sm rounded-xl transition-all ${
            (skipDemographics ? step === 2 : step === 1) || isLoading
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          id="next-btn"
          onClick={handleNext}
          disabled={
            isLoading ||
            (step === 1 && !isStep1Valid) ||
            (step === 2 && !isStep2Valid) ||
            (step === 3 && !isStep3Valid)
          }
          className={`px-6 py-3 font-sans font-bold text-sm text-white rounded-xl shadow-md transition-all flex items-center gap-2 ${
            isLoading ||
            (step === 1 && !isStep1Valid) ||
            (step === 2 && !isStep2Valid) ||
            (step === 3 && !isStep3Valid)
              ? 'bg-[#001124] border border-[#002246] cursor-not-allowed text-slate-600 shadow-none'
              : 'bg-[#0285ff] hover:bg-[#0075e3]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 border-2 border-slate-600 border-t-white rounded-full animate-spin"></span>
              <span>Personalizing Habits...</span>
            </div>
          ) : step === 3 ? (
            <div className="flex items-center gap-1.5">
              <span>View Results</span>
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

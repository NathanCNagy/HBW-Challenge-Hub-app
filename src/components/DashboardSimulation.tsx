import React, { useState } from 'react';
import { Goal, Category, QuizAnswers } from '../types';
import { 
  Trophy, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  ArrowLeft, 
  TrendingUp, 
  Award, 
  Share2, 
  Download, 
  Leaf, 
  Check, 
  AlertCircle, 
  MessageSquare, 
  Bell, 
  Layers, 
  X,
  MoreVertical,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import EcosystemVisualization from './EcosystemVisualization';
import CommunityChat from './CommunityChat';
import SmartAlerts from './SmartAlerts';
import HabitsManager from './HabitsManager';

interface DashboardSimulationProps {
  goal: Goal;
  onReset: () => void;
  answers: QuizAnswers;
  onUpdateAnswers?: (newAnswers: QuizAnswers) => void;
  user?: any;
  onSignOut?: () => void;
  onOpenAuth?: () => void;
}

type TabType = 'forest' | 'pulse' | 'wardrobe' | 'alerts' | 'chat';

export default function DashboardSimulation({ 
  goal, 
  onReset, 
  answers, 
  onUpdateAnswers,
  user,
  onSignOut,
  onOpenAuth
}: DashboardSimulationProps) {
  // Store the active focusing goal. It defaults to the onboarding selected habit.
  const [activeGoal, setActiveGoal] = useState<Goal>(goal);
  
  // Mobile app bottom tab selection state
  const [activeTab, setActiveTab] = useState<TabType>('forest');

  // Overflow menu visibility state
  const [showOverflowMenu, setShowOverflowMenu] = useState<boolean>(false);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editAge, setEditAge] = useState<string>(answers.age);
  const [editGender, setEditGender] = useState<string>(answers.gender);

  const handleStartEdit = () => {
    setEditAge(answers.age);
    setEditGender(answers.gender);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    if (onUpdateAnswers) {
      onUpdateAnswers({
        ...answers,
        age: editAge || answers.age,
        gender: editGender || answers.gender,
      });
    }
    setIsEditingProfile(false);
  };

  // Interactive habit progress states
  const [streak, setStreak] = useState<number>(3);
  const [hasLoggedToday, setHasLoggedToday] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [individualEnergy, setIndividualEnergy] = useState<number>(45); // Ant Forest points
  const [dismissedBubbleAlert, setDismissedBubbleAlert] = useState<boolean>(false);

  // Shared Bubble State for Ecosystem Tree (percentages for responsiveness)
  const [bubbles, setBubbles] = useState<{ id: number; cx: number; cy: number; value: number; type: string; label: string; isNew?: boolean }[]>([]);

  // Category bubble types
  const bubbleTypesByCategory = {
    'Environment': [
      { type: 'co2', label: 'CO2 Offset', value: 5 },
      { type: 'water', label: 'Water Drop', value: 15 },
      { type: 'land', label: 'Soil Nutrient', value: 10 }
    ],
    'Well-Being': [
      { type: 'focus', label: 'Focus Boost', value: 10 },
      { type: 'sleep', label: 'Rest Energy', value: 15 },
      { type: 'mind', label: 'Dopamine Check', value: 5 }
    ],
    'Compassion': [
      { type: 'kind', label: 'Kindness Unit', value: 15 },
      { type: 'bond', label: 'Social Tie', value: 10 },
      { type: 'warmth', label: 'Oxytocin', value: 5 }
    ],
    'Responsible AI': [
      { type: 'verify', label: 'Fact Guard', value: 10 },
      { type: 'compute', label: 'Cycle Saved', value: 15 },
      { type: 'mind', label: 'Original Thought', value: 5 }
    ]
  };

  // Initialize bubbles on category change
  React.useEffect(() => {
    const category = activeGoal.category;
    const bubbleTypes = bubbleTypesByCategory[category] || [{ type: 'generic', label: 'Habit Point', value: 10 }];
    const initialBubbles = Array.from({ length: 3 }).map((_, i) => {
      const typeObj = bubbleTypes[i % bubbleTypes.length];
      return {
        id: Math.floor(Math.random() * 10000000) + i,
        cx: 15 + Math.random() * 70, // percentage 15% to 85%
        cy: 15 + Math.random() * 60, // percentage 15% to 75%
        value: typeObj.value,
        type: typeObj.type,
        label: typeObj.label
      };
    });
    setBubbles(initialBubbles);
  }, [activeGoal.category]);

  // Interactive checklist sub-items
  const [checklist, setChecklist] = useState({
    habitDone: false,
    anchorDone: false,
    reflectDone: false
  });

  // Encouraging psychological motivational quotes
  const [motivationalQuote, setMotivationalQuote] = useState<string>(
    "Every small habit you build is a step toward a better world. Start small, think big."
  );

  const quotesList = [
    "Every action you take is a vote for the type of person you wish to become. — James Clear",
    "By keeping your actions small, you make starting effortless. — B.J. Fogg",
    "A beautiful forest begins with nurturing a single tiny seed.",
    "Small steps compound over time. In 90 days, you will be amazed by your progress.",
    "Don't worry about the mountain. Just take the next small step. The rest will follow.",
    "Repeated actions shape your mind. You are building positive new habits today!"
  ];

  const handleCheckItem = (item: 'habitDone' | 'anchorDone' | 'reflectDone') => {
    const updated = { ...checklist, [item]: !checklist[item] };
    setChecklist(updated);

    // Dynamic quote update on checking items
    const randomQuote = quotesList[Math.floor(Math.random() * quotesList.length)];
    setMotivationalQuote(randomQuote);

    // Auto log if all items are checked
    if (updated.habitDone && updated.anchorDone && updated.reflectDone && !hasLoggedToday) {
      handleLogSuccess();
    }
  };

  const handleLogSuccess = () => {
    if (hasLoggedToday) return;
    setStreak((prev) => prev + 1);
    setIndividualEnergy((prev) => prev + 25);
    setHasLoggedToday(true);
    setDismissedBubbleAlert(false);
    setShowConfetti(true);
    setChecklist({ habitDone: true, anchorDone: true, reflectDone: true });

    // Spawn a premium glowing bubble immediately in the shared state
    const category = activeGoal.category;
    const bubbleTypes = bubbleTypesByCategory[category] || [{ type: 'generic', label: 'Habit Point', value: 10 }];
    const randomType = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
    
    setBubbles(prev => {
      if (prev.length >= 5) return prev; // cap at 5 bubbles
      return [
        ...prev,
        {
          id: Math.floor(Math.random() * 10000000) + 1000,
          cx: 20 + Math.random() * 60, // more centered percentage
          cy: 20 + Math.random() * 50,
          value: randomType.value + 5, // premium value for completing daily challenge!
          type: randomType.type,
          label: `${randomType.label} (Daily Bonus)`,
          isNew: true
        }
      ];
    });

    setTimeout(() => {
      setShowConfetti(false);
    }, 3500);
  };

  // Listen for completed from watch or sync requests
  React.useEffect(() => {
    const handleCompleteFromWatch = () => {
      if (!hasLoggedToday) {
        setChecklist({ habitDone: true, anchorDone: true, reflectDone: true });
        handleLogSuccess();
      }
    };

    const handleSyncRequest = () => {
      window.dispatchEvent(new CustomEvent('hbw:sync-state', {
        detail: {
          streak,
          hasLoggedToday,
          individualEnergy,
          goalTitle: activeGoal.title,
          goalCategory: activeGoal.category,
          checklist,
        }
      }));
    };

    window.addEventListener('hbw:complete-habit-from-watch', handleCompleteFromWatch);
    window.addEventListener('hbw:request-state-sync', handleSyncRequest);

    return () => {
      window.removeEventListener('hbw:complete-habit-from-watch', handleCompleteFromWatch);
      window.removeEventListener('hbw:request-state-sync', handleSyncRequest);
    };
  }, [hasLoggedToday, streak, individualEnergy, activeGoal, checklist]);

  // Dispatch sync event whenever states change
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent('hbw:sync-state', {
      detail: {
        streak,
        hasLoggedToday,
        individualEnergy,
        goalTitle: activeGoal.title,
        goalCategory: activeGoal.category,
        checklist,
      }
    }));
  }, [streak, hasLoggedToday, individualEnergy, activeGoal, checklist]);

  // Projected 3-Month metrics calculator based on active habit category
  const getMetricsLabels = () => {
    switch (activeGoal.category) {
      case 'Environment':
        return {
          primaryValue: `${(streak * 460).toLocaleString()} L`,
          primaryLabel: 'Water Resources Restored',
          secondaryValue: `${(streak * 1.2).toFixed(1)} kg`,
          secondaryLabel: 'CO2 Emissions Avoided',
          targetTip: 'Plant-protein food swaps and trip reduction cut structural grid constraints directly.'
        };
      case 'Well-Being':
        return {
          primaryValue: `${(streak * 0.5).toFixed(1)} hrs`,
          primaryLabel: 'Digital Attention Reclaimed',
          secondaryValue: hasLoggedToday ? 'Regulated' : 'Slightly Elevated',
          secondaryLabel: 'Cortisol & Dopamine Loop State',
          targetTip: 'Morning screen distance resets biological rhythm and improves slow-wave sleep.'
        };
      case 'Compassion':
        return {
          primaryValue: `${streak} nodes`,
          primaryLabel: 'Social Connections Strengthened',
          secondaryValue: `+${(12 + streak * 1.5).toFixed(0)}%`,
          secondaryLabel: 'Mutual Subjective Wellbeing Lift',
          targetTip: 'Unscheduled, agenda-free check-ins trigger high reciprocal oxytocin and security.'
        };
      case 'Responsible AI':
      default:
        return {
          primaryValue: `${(streak * 420).toLocaleString()} units`,
          primaryLabel: 'Central Server Compute Saved',
          secondaryValue: `${streak} verified`,
          secondaryLabel: 'Fact-Check Grounding Audits',
          targetTip: 'Consolidating generative prompts directly helps save grid-cooling water footprints.'
        };
    }
  };

  const metrics = getMetricsLabels();

  // Progress calculations out of the 90-day (3 months) commitment
  const progressPercent = Math.min(((streak) / 90) * 100, 100).toFixed(1);

  const downloadPlanPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4' // 595.28 x 841.89 points
    });

    const primaryColor = [2, 133, 255]; // Blue accent
    const accentColor = [56, 161, 243]; // Light blue
    const textDark = [15, 23, 42]; // Slate 900
    const textMuted = [100, 116, 139]; // Slate 500
    const bgLight = [248, 250, 252]; // Slate 50

    // Draw background
    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    doc.rect(0, 0, 595, 842, 'F');

    // Draw border
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(2);
    doc.rect(20, 20, 555, 802, 'D');

    // Title / Header
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('times', 'bold');
    doc.setFontSize(24);
    doc.text('HABITS FOR A BETTER WORLD', 297, 65, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text('3-MONTH CLINICAL BEHAVIOR CHANGE ACTION PLAN', 297, 85, { align: 'center' });

    // Decorative line
    doc.setDrawColor(2, 133, 255);
    doc.setLineWidth(1.5);
    doc.line(50, 95, 545, 95);

    // Section 1: Active Focus
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('COMMITTED HABIT FOCUS', 50, 125);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(activeGoal.title, 50, 145);

    // ACTION
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text('DAILY HABIT ACTION PATHWAY:', 50, 172);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const actionText = doc.splitTextToSize(activeGoal.action, 495);
    doc.text(actionText, 50, 190);

    const actionHeight = actionText.length * 15;
    const impactStart = 190 + actionHeight + 20;

    // Section 2: Personal Impact Projection
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('90-DAY COMPOUNDING DIRECT IMPACT', 50, impactStart);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    
    const cleanImpact = activeGoal.impact
      .replace(/\[IMPACT\]\n/g, '')
      .replace(/\[CONTEXT\]\n/g, '\nContext:\n')
      .replace(/\[OPTIMIZATION\]\n/g, '\nOptimization Insights:\n');

    const impactTextLines = doc.splitTextToSize(cleanImpact, 495);
    doc.text(impactTextLines, 50, impactStart + 18);

    const impactHeight = impactTextLines.length * 14;
    const routineStart = impactStart + 18 + impactHeight + 22;

    // Section 3: Daily Routine Anchoring
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('SCIENTIFIC ROUTINE ANCHORING TIP', 50, routineStart);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const tipText = doc.splitTextToSize(`${metrics.targetTip} To maximize reliability: perform your microchange right after a static daily anchor event (such as brushing your teeth or brewing your morning coffee). Placing visual reminders in plain sight removes starting friction.`, 495);
    doc.text(tipText, 50, routineStart + 18);

    const tipHeight = tipText.length * 14;
    const progressStart = routineStart + 18 + tipHeight + 25;

    // Section 4: Progress Grid
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('90-DAY PROGRESS JOURNAL & STREAK TRACKER', 50, progressStart);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`Active Streak: ${streak} days completed. Check off each box upon completing your habit today.`, 50, progressStart + 15);

    const boxSize = 22;
    const spacing = 6;
    const startX = 50;
    const startY = progressStart + 28;

    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 15; c++) {
        const x = startX + c * (boxSize + spacing);
        const y = startY + r * (boxSize + spacing);
        const boxIndex = r * 15 + c + 1;

        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(1);
        
        if (boxIndex <= streak) {
          doc.setFillColor(2, 133, 255);
          doc.rect(x, y, boxSize, boxSize, 'F');
          
          doc.setTextColor(255, 255, 255);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.text('✔', x + boxSize/2, y + boxSize/2 + 3, { align: 'center' });
        } else {
          doc.setFillColor(255, 255, 255);
          doc.rect(x, y, boxSize, boxSize, 'FD');
          
          doc.setTextColor(148, 163, 184);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.text(boxIndex.toString(), x + boxSize/2, y + boxSize/2 + 3, { align: 'center' });
        }
      }
    }

    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Habits for a Better World Foundation', 297, 785, { align: 'center' });

    doc.save(`habits_better_world_${activeGoal.id}_plan.pdf`);
  };

  return (
    <div className="w-full flex-grow flex flex-col justify-between max-w-sm mx-auto bg-[#000814] text-slate-100 min-h-[730px] relative">
      
      {/* Dynamic Mini Bezel Header */}
      <div className="px-4 py-3 bg-[#000f1f] border-b border-[#002246] flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-1.5">
          <Leaf className="w-4 h-4 text-[#0285ff]" />
          <span className="font-serif font-bold text-xs tracking-tight text-white">HBW Challenge Hub</span>
        </div>

        <div className="flex items-center gap-1.5 relative">
          <button
            onClick={() => setShowOverflowMenu(!showOverflowMenu)}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              showOverflowMenu 
                ? 'bg-[#0285ff] text-white' 
                : 'text-slate-400 hover:text-white hover:bg-[#002246]'
            }`}
            title="More Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overflow Menu Overlay */}
      <AnimatePresence>
        {showOverflowMenu && (
          <>
            {/* Click-away backdrop */}
            <div 
              className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setShowOverflowMenu(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-12 right-3 w-72 bg-[#000e1e]/95 border border-[#0285ff]/30 rounded-2xl shadow-2xl p-4 z-50 backdrop-blur-md flex flex-col gap-4 font-sans text-slate-200"
            >
              {/* Header inside the menu */}
              <div className="flex items-center justify-between border-b border-[#002246]/50 pb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  HBW Hub Menu
                </span>
                <button 
                  onClick={() => setShowOverflowMenu(false)}
                  className="p-1 hover:bg-[#002246] rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Profile Section */}
              <div className="p-3 bg-slate-950/70 border border-[#002246]/60 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-[#002246]/30 pb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#0285ff]/20 border border-[#0285ff]/30 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-[#0285ff]" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white leading-tight">
                        {user?.displayName || 'My Profile'}
                      </h4>
                      <p className={`text-[7.5px] font-mono uppercase tracking-wider font-bold ${
                        user ? 'text-emerald-400' : 'text-amber-400 animate-pulse'
                      }`}>
                        {user ? 'Verified Challenger' : 'Guest Sandbox (Offline)'}
                      </p>
                    </div>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={handleStartEdit}
                      className="text-[9px] font-semibold text-[#0285ff] hover:text-white transition-colors px-1.5 py-0.5 rounded border border-[#0285ff]/20 hover:bg-[#002246] cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[9px] leading-tight pt-1">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-mono text-[8px] uppercase">Age</label>
                      <input
                        type="text"
                        value={editAge}
                        onChange={(e) => setEditAge(e.target.value)}
                        className="w-full px-1.5 py-0.5 text-2xs border border-[#0285ff]/30 rounded bg-[#000f1f] text-white focus:outline-none focus:ring-1 focus:ring-[#0285ff]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400 font-mono text-[8px] uppercase">Gender</label>
                      <select
                        value={editGender}
                        onChange={(e) => setEditGender(e.target.value)}
                        className="w-full px-1 py-0.5 text-2xs border border-[#0285ff]/30 rounded bg-[#000f1f] text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0285ff]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary / Other">Non-binary</option>
                        <option value="Prefer not to say">Secret</option>
                      </select>
                    </div>
                    <div className="flex gap-2 justify-end col-span-2 mt-2 pt-1 border-t border-[#002246]/30">
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="text-[8px] font-semibold text-slate-400 hover:text-white transition-colors px-1.5 py-0.5 rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="text-[8px] font-bold bg-[#0285ff] text-white rounded px-2.5 py-0.5 hover:bg-[#0075e3] transition-colors cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-0.5">
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[9px] leading-tight">
                      <div className="flex flex-col">
                        <span className="text-slate-400 font-mono text-[8px] uppercase">Age</span>
                        <span className="text-white font-semibold">{answers.age || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 font-mono text-[8px] uppercase">Gender</span>
                        <span className="text-white font-semibold">{answers.gender || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <span className="text-slate-400 font-mono text-[8px] uppercase">Living Context</span>
                        <span className="text-white font-semibold truncate">{answers.livingArrangement || 'N/A'}</span>
                      </div>
                      {user && (
                        <div className="flex flex-col col-span-2 border-t border-[#002246]/20 pt-1">
                          <span className="text-slate-400 font-mono text-[8px] uppercase">Account Email</span>
                          <span className="text-white font-semibold truncate text-[8.5px] font-mono">{user.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Authentication CTA Button */}
                    <div className="pt-1.5 border-t border-[#002246]/30">
                      {user ? (
                        <button
                          onClick={() => {
                            if (onSignOut) onSignOut();
                            setShowOverflowMenu(false);
                          }}
                          className="w-full py-1.5 bg-red-950/30 hover:bg-red-900/40 text-red-300 border border-red-500/20 text-[9px] font-bold rounded-lg transition-colors cursor-pointer text-center"
                        >
                          Sign Out of Account
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (onOpenAuth) onOpenAuth();
                            setShowOverflowMenu(false);
                          }}
                          className="w-full py-1.5 bg-[#0285ff]/20 hover:bg-[#0285ff]/30 text-white border border-[#0285ff]/40 text-[9px] font-bold rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0285ff] animate-ping" />
                          <span>Sign Up / Sync with Cloud</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions List */}
              <div className="flex flex-col gap-2">
                <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest px-1">
                  ACTIONS
                </span>
                
                {/* Habits Wardrobe item */}
                <button
                  onClick={() => {
                    setActiveTab('wardrobe');
                    setShowOverflowMenu(false);
                  }}
                  className="w-full p-2 bg-[#00172f]/50 hover:bg-[#0285ff]/10 border border-[#0285ff]/20 hover:border-[#0285ff]/40 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#0285ff]" />
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white">Habits Wardrobe</span>
                  </div>
                  <span className="text-[8px] bg-[#0285ff]/20 text-[#0285ff] font-bold px-1.5 py-0.5 rounded-md font-mono">
                    TAB
                  </span>
                </button>

                {/* PDF habits plan item */}
                <button
                  onClick={() => {
                    downloadPlanPDF();
                    setShowOverflowMenu(false);
                  }}
                  className="w-full p-2 bg-[#00172f]/50 hover:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white">Download PDF Plan</span>
                  </div>
                  <span className="text-[8px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded-md font-mono">
                    PDF
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confetti Micro-Simulator Alert */}
      {showConfetti && (
        <div className="mx-4 mt-2 text-center p-2 bg-[#00172f] border border-[#0285ff]/40 text-sky-200 font-sans text-[10px] font-semibold rounded-xl animate-bounce shadow-lg">
          🎉 Incredible! Microchange recorded. +25g Energy added to your Ecosystem.
        </div>
      )}

      {/* Active Focus Header Details */}
      <div className="mx-4 mt-3 p-3 bg-slate-950 border border-[#002246] rounded-2xl flex flex-col gap-1.5 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#001224]/50 rounded-full translate-x-4 -translate-y-4"></div>
        <div className="flex items-center gap-1.5 z-10">
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#0285ff]">
            ACTIVE DAILY HABIT FOCUS
          </span>
        </div>
        <h3 className="text-xs font-serif text-white font-bold leading-tight z-10 truncate">
          {activeGoal.title}
        </h3>
        <p className="text-[10px] text-slate-300 leading-normal font-sans z-10">
          {activeGoal.action}
        </p>
      </div>

      {/* Primary Tab View Area (Scrollable content) */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        
        {/* FOREST TAB: Gamified visual ecosystem & collective progress */}
        {activeTab === 'forest' && (
          <EcosystemVisualization
            category={activeGoal.category}
            streak={streak}
            individualEnergy={individualEnergy}
            setIndividualEnergy={setIndividualEnergy}
            hasLoggedToday={hasLoggedToday}
            onLogToday={handleLogSuccess}
            goalTitle={activeGoal.title}
            bubbles={bubbles}
            setBubbles={setBubbles}
          />
        )}

        {/* PULSE TAB: Daily checklist, log success, and motivational psychology */}
        {activeTab === 'pulse' && (
          <div className="flex flex-col gap-4 w-full">
            {/* Daily Checklist */}
            <div className="p-4 bg-slate-950 border border-[#002246] rounded-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#002246]/50 pb-2">
                <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#0285ff]" />
                  Today's Daily Pulse
                </h4>
                <span className="text-3xs font-mono text-slate-400">Complete items to auto-log</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {/* Checklist Item 1 */}
                <button
                  onClick={() => handleCheckItem('habitDone')}
                  className="flex items-start gap-2.5 text-left text-xs transition-colors p-1 rounded-lg hover:bg-black/30"
                >
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    checklist.habitDone 
                      ? 'bg-[#0285ff] border-[#0285ff] text-white' 
                      : 'border-[#002246]/80 text-transparent'
                  }`}>
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <div className="space-y-0.5">
                    <span className={`font-semibold text-slate-200 leading-tight block ${checklist.habitDone ? 'line-through text-slate-500' : ''}`}>
                      Perform {activeGoal.title} Action
                    </span>
                    <span className="text-[9px] text-slate-400 block leading-normal">{activeGoal.action}</span>
                  </div>
                </button>

                {/* Checklist Item 2 */}
                <button
                  onClick={() => handleCheckItem('anchorDone')}
                  className="flex items-start gap-2.5 text-left text-xs transition-colors p-1 rounded-lg hover:bg-black/30"
                >
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    checklist.anchorDone 
                      ? 'bg-[#0285ff] border-[#0285ff] text-white' 
                      : 'border-[#002246]/80 text-transparent'
                  }`}>
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <div className="space-y-0.5">
                    <span className={`font-semibold text-slate-200 leading-tight block ${checklist.anchorDone ? 'line-through text-slate-500' : ''}`}>
                      Do it right after your cue
                    </span>
                    <span className="text-[9px] text-slate-400 block leading-normal">Tick this when you do your habit right after your daily cue event.</span>
                  </div>
                </button>

                {/* Checklist Item 3 */}
                <button
                  onClick={() => handleCheckItem('reflectDone')}
                  className="flex items-start gap-2.5 text-left text-xs transition-colors p-1 rounded-lg hover:bg-black/30"
                >
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    checklist.reflectDone 
                      ? 'bg-[#0285ff] border-[#0285ff] text-white' 
                      : 'border-[#002246]/80 text-transparent'
                  }`}>
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <div className="space-y-0.5">
                    <span className={`font-semibold text-slate-200 leading-tight block ${checklist.reflectDone ? 'line-through text-slate-500' : ''}`}>
                      Take a 10-second pause
                    </span>
                    <span className="text-[9px] text-slate-400 block leading-normal">Pause for a moment to feel good about this small step for yourself and the planet.</span>
                  </div>
                </button>
              </div>

              {/* Log Button */}
              <button
                onClick={handleLogSuccess}
                disabled={hasLoggedToday}
                className={`w-full py-2.5 font-sans font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 ${
                  hasLoggedToday
                    ? 'bg-[#001124] text-slate-500 cursor-not-allowed border border-[#002246]'
                    : 'bg-[#0285ff] hover:bg-[#0075e3] text-white active:scale-95 hover:scale-[1.01]'
                }`}
              >
                {hasLoggedToday ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#0285ff]" />
                    <span>Completed for Today</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Log Success Manually</span>
                  </>
                )}
              </button>

              {hasLoggedToday && bubbles.some(b => b.isNew) && !dismissedBubbleAlert && (
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    y: 15,
                    borderColor: "rgba(2, 133, 255, 0.3)",
                    backgroundColor: "rgba(0, 23, 47, 0.8)",
                    boxShadow: "0 0 0px rgba(2, 133, 255, 0)"
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    borderColor: [
                      "rgba(2, 133, 255, 0.3)", 
                      "rgba(16, 185, 129, 0.5)", 
                      "rgba(245, 158, 11, 0.4)", 
                      "rgba(2, 133, 255, 0.3)"
                    ],
                    backgroundColor: [
                      "rgba(0, 23, 47, 0.8)", 
                      "rgba(4, 30, 25, 0.8)", 
                      "rgba(35, 25, 5, 0.8)", 
                      "rgba(0, 23, 47, 0.8)"
                    ],
                    boxShadow: [
                      "0 0 4px rgba(2, 133, 255, 0.1)",
                      "0 0 12px rgba(16, 185, 129, 0.3)",
                      "0 0 4px rgba(245, 158, 11, 0.1)",
                      "0 0 4px rgba(2, 133, 255, 0.1)"
                    ]
                  }}
                  transition={{ 
                    y: { duration: 0.5, ease: "easeOut" },
                    opacity: { duration: 0.5 },
                    borderColor: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    backgroundColor: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="mt-3 p-3 border rounded-xl text-center space-y-1 relative"
                >
                  <button 
                    onClick={() => setDismissedBubbleAlert(true)}
                    className="absolute top-1 right-2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                    title="Dismiss notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-2xs font-sans font-semibold text-sky-200 pr-4">
                    ✨ A new glowing Energy Bubble (+15g-20g) has sprouted on your Ecosystem Tree!
                  </p>
                  <button
                    onClick={() => setActiveTab('forest')}
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#0285ff] hover:underline"
                  >
                    Go to Forest Tab to Pop It &rarr;
                  </button>
                </motion.div>
              )}
            </div>

            {/* Motivational Psychology Card */}
            <div className="p-4 bg-[#000f1f]/60 border border-[#002246] rounded-2xl flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0285ff] animate-pulse" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#0285ff]">
                  Daily Motivation
                </span>
              </div>
              <p className="text-2xs text-slate-200 leading-relaxed font-sans italic">
                "{motivationalQuote}"
              </p>
            </div>

            {/* Projected Impact Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 border border-[#002246] rounded-2xl text-center space-y-0.5">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block">{metrics.primaryLabel.toUpperCase()}</span>
                <span className="text-base font-serif text-[#0285ff] font-bold block animate-fade-in">{metrics.primaryValue}</span>
              </div>
              <div className="p-3 bg-slate-950 border border-[#002246] rounded-2xl text-center space-y-0.5">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block">{metrics.secondaryLabel.toUpperCase()}</span>
                <span className="text-base font-serif text-white font-bold block">{metrics.secondaryValue}</span>
              </div>
            </div>

            {/* Quick Informational Tip */}
            <div className="p-3.5 bg-slate-950 border border-[#002246] rounded-xl flex gap-2">
              <AlertCircle className="w-4 h-4 text-[#0285ff] shrink-0 mt-0.5" />
              <p className="text-[9px] text-slate-400 leading-normal font-sans">
                {metrics.targetTip} Check off items daily to establish neural automaticity. On average, a micro-habit becomes subconscious after 21 consecutive days of consistent anchor cues.
              </p>
            </div>
          </div>
        )}

        {/* WARDROBE TAB: Multiple Habit Management */}
        {activeTab === 'wardrobe' && (
          <HabitsManager
            activeGoal={activeGoal}
            setActiveGoal={setActiveGoal}
            onResetQuiz={onReset}
          />
        )}

        {/* ALERTS TAB: Smart Alerts setting and push notification triggers */}
        {activeTab === 'alerts' && (
          <SmartAlerts
            goalTitle={activeGoal.title}
          />
        )}

        {/* CHAT TAB: Slack community & active message stream */}
        {activeTab === 'chat' && (
          <CommunityChat
            category={activeGoal.category}
            goalTitle={activeGoal.title}
          />
        )}

      </div>

      {/* Simulated Bezel Bottom Navigation Bar */}
      <div className="bg-[#000f1f] border-t border-[#002246] py-1 flex justify-around items-center shrink-0 z-20">
        {/* Forest Tab button */}
        <button
          onClick={() => setActiveTab('forest')}
          className={`flex flex-col items-center justify-center p-1.5 transition-all w-16 relative ${
            activeTab === 'forest' ? 'text-[#0285ff]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Leaf className="w-4 h-4 mb-0.5" />
            {bubbles.length > 0 && (
              <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-yellow-400 ring-2 ring-[#000f1f] animate-pulse" />
            )}
          </div>
          <span className="text-[8px] font-sans font-bold leading-none flex items-center gap-0.5">
            Forest
            {bubbles.length > 0 && (
              <span className="text-[7.5px] text-yellow-400 font-mono font-bold font-sans">({bubbles.length})</span>
            )}
          </span>
        </button>

        {/* Pulse Tab button */}
        <button
          onClick={() => setActiveTab('pulse')}
          className={`flex flex-col items-center justify-center p-1.5 transition-all w-16 ${
            activeTab === 'pulse' ? 'text-[#0285ff]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckCircle className="w-4 h-4 mb-0.5" />
          <span className="text-[8px] font-sans font-bold leading-none">Pulse</span>
        </button>

        {/* Wardrobe Tab button */}
        <button
          onClick={() => setActiveTab('wardrobe')}
          className={`flex flex-col items-center justify-center p-1.5 transition-all w-16 ${
            activeTab === 'wardrobe' ? 'text-[#0285ff]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span className="text-[8px] font-sans font-bold leading-none">Wardrobe</span>
        </button>

        {/* Alerts Tab button */}
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex flex-col items-center justify-center p-1.5 transition-all w-16 ${
            activeTab === 'alerts' ? 'text-[#0285ff]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bell className="w-4 h-4 mb-0.5" />
          <span className="text-[8px] font-sans font-bold leading-none">Alerts</span>
        </button>

        {/* Chat Tab button */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center justify-center p-1.5 transition-all w-16 ${
            activeTab === 'chat' ? 'text-[#0285ff]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[8px] font-sans font-bold leading-none">Chat</span>
        </button>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Bell, Smartphone, Clock, ShieldCheck, RefreshCw, Zap, Save } from 'lucide-react';

interface SmartAlertsProps {
  goalTitle: string;
  defaultAnchor?: string;
}

export default function SmartAlerts({ goalTitle, defaultAnchor = 'pouring my morning coffee' }: SmartAlertsProps) {
  const [anchor, setAnchor] = useState(defaultAnchor);
  const [alertTime, setAlertTime] = useState('08:15');
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [pushOptIn, setPushOptIn] = useState(true);
  const [groupAlerts, setGroupAlerts] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveAlerts = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  // Mock motivational push / in-app message content
  const getMockPushMessage = () => {
    return `🚨 Habit Reminder: Right after you finish "${anchor}", remember to do your "${goalTitle}". Consistency is key!`;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Alert Settings panel */}
      <div className="p-4 bg-slate-950 border border-[#002246] rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-[#002246]/50 pb-2">
          <Bell className="w-4 h-4 text-[#0285ff]" />
          <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider">
            Smart Reminders
          </h4>
        </div>

        {/* Anchor prompt input */}
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
            Pair with a daily habit
          </label>
          <p className="text-[9px] text-slate-400 leading-normal">
            Pair your new habit with something you already do every single day (like brushing your teeth or brewing morning coffee).
          </p>
          <input
            type="text"
            value={anchor}
            onChange={(e) => setAnchor(e.target.value)}
            className="w-full bg-black text-slate-200 border border-[#002246] focus:border-[#0285ff] outline-none text-2xs px-3 py-1.5 rounded-xl transition-all shadow-inner font-sans"
            placeholder="e.g. pouring my morning coffee"
          />
        </div>

        {/* Grid for toggle items */}
        <div className="space-y-3 pt-1">
          {/* Push Toggles */}
          <div className="flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200 block">Push Notifications</span>
              <span className="text-[9px] text-slate-400 block leading-tight">Trigger immediately after anchor event</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={pushOptIn} 
                onChange={(e) => setPushOptIn(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-8 h-4 bg-slate-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0285ff]"></div>
            </label>
          </div>

          {/* Weekly Encouraging Messages Toggle */}
          <div className="flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200 block">Weekly Encouraging Messages</span>
              <span className="text-[9px] text-slate-400 block leading-tight">Weekly encouraging messages from the native app</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={smsOptIn} 
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-8 h-4 bg-slate-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0285ff]"></div>
            </label>
          </div>

          {/* Group Milestone Alerts */}
          <div className="flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200 block">Group Milestone News</span>
              <span className="text-[9px] text-slate-400 block leading-tight">Notify when the group reaches goals</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={groupAlerts} 
                onChange={(e) => setGroupAlerts(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-8 h-4 bg-slate-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0285ff]"></div>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSaveAlerts}
          className="w-full py-2 bg-[#0285ff] hover:bg-[#0075e3] active:scale-95 text-white font-sans text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 mt-2"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Reminder Settings</span>
        </button>

        {isSaved && (
          <p className="text-[9px] font-mono text-center text-emerald-400 font-bold animate-pulse">
            ✔ Saved! Smart alert schedule updated.
          </p>
        )}
      </div>

      {/* Interactive Notification Live Preview Simulator */}
      <div className="p-4 bg-slate-950 border border-[#002246] rounded-2xl flex flex-col gap-2">
        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">
          Notification Preview
        </span>
        
        <div className="bg-slate-900 border border-[#002246] p-3 rounded-xl flex items-start gap-2.5 shadow-md">
          <Smartphone className="w-5 h-5 text-[#0285ff] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-[10px] text-white">HABITS FOR A BETTER WORLD</span>
              <span className="text-[8px] text-slate-500 font-mono">08:15 AM</span>
            </div>
            <p className="text-[10px] text-slate-300 font-sans leading-normal">
              {getMockPushMessage()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

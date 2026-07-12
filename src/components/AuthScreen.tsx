import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthScreenProps {
  onLoginSuccess: (displayName: string, email: string) => void;
  onContinueAsGuest: () => void;
}

export default function AuthScreen({ onLoginSuccess, onContinueAsGuest }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (isSignUp && !displayName) {
      setError('Please enter your name');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    // Interactive Prototype simulation logic
    setTimeout(() => {
      try {
        if (isSignUp) {
          // Register mock credentials in localStorage for a robust mock experience
          const registeredUsers = JSON.parse(localStorage.getItem('hbw_mock_users') || '{}');
          registeredUsers[email.toLowerCase()] = {
            displayName: displayName,
            password: password
          };
          localStorage.setItem('hbw_mock_users', JSON.stringify(registeredUsers));
          
          onLoginSuccess(displayName, email);
        } else {
          // Login check simulation
          const registeredUsers = JSON.parse(localStorage.getItem('hbw_mock_users') || '{}');
          const matchedUser = registeredUsers[email.toLowerCase()];
          
          if (matchedUser) {
            if (matchedUser.password === password) {
              onLoginSuccess(matchedUser.displayName, email);
            } else {
              setError('Invalid password for this mock user account.');
              setIsLoading(false);
            }
          } else {
            // If they just logged in with any email that isn't pre-registered, let them in automatically with a fallback name
            // this is an awesome UX practice for interactive design prototypes!
            const derivedName = email.split('@')[0];
            const capitalizedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
            
            // Auto register them to make future logins seamless
            registeredUsers[email.toLowerCase()] = {
              displayName: capitalizedName,
              password: password
            };
            localStorage.setItem('hbw_mock_users', JSON.stringify(registeredUsers));
            
            onLoginSuccess(capitalizedName, email);
          }
        }
      } catch (err: any) {
        console.error(err);
        setError('Error simulating authentication.');
        setIsLoading(false);
      }
    }, 700);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-[#000814] text-slate-100 min-h-[640px] flex flex-col justify-between p-6 rounded-3xl border border-[#002246] shadow-2xl relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full bg-[#0285ff]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Top Brand Info */}
      <div className="flex flex-col items-center text-center pt-4 z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#002246] to-[#0285ff]/20 border border-[#0285ff]/40 flex items-center justify-center mb-3.5 shadow-md">
          <Sparkles className="w-6 h-6 text-[#0285ff]" />
        </div>
        <h2 className="font-serif text-xl font-bold tracking-tight text-white">
          Habits for a Better World
        </h2>
        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-1">
          {isSignUp ? 'Create your ecosystem' : 'Access your dashboard'}
        </p>
      </div>

      {/* Main Auth Form Container */}
      <div className="flex-grow flex flex-col justify-center my-6 z-10">
        <form onSubmit={handleAuth} className="space-y-3.5">
          {/* Display Name Input (Only on Sign Up) */}
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Nathan"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-[#002246] hover:border-[#0285ff]/40 focus:border-[#0285ff] rounded-xl text-xs text-white placeholder-slate-600 outline-none transition-all"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-[#002246] hover:border-[#0285ff]/40 focus:border-[#0285ff] rounded-xl text-xs text-white placeholder-slate-600 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-[#002246] hover:border-[#0285ff]/40 focus:border-[#0285ff] rounded-xl text-xs text-white placeholder-slate-600 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-950/40 border border-red-500/20 text-red-200 text-2xs rounded-xl flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 mt-2 bg-[#0285ff] hover:bg-[#0075e3] active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-500 disabled:scale-100 font-sans text-xs font-bold rounded-xl text-white shadow-lg shadow-[#0285ff]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? 'Create Account (Demo)' : 'Log In (Demo)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode Link */}
        <div className="text-center mt-4">
          <p className="text-2xs text-slate-400 font-sans">
            {isSignUp ? 'Already have an account?' : 'Need a permanent ecosystem forest?'}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-[#0285ff] font-bold hover:underline ml-1 cursor-pointer"
            >
              {isSignUp ? 'Log In' : 'Sign Up Free'}
            </button>
          </p>
        </div>
      </div>

      {/* Guest Login Option / Safety Net */}
      <div className="border-t border-[#002246]/50 pt-4 pb-2 z-10 flex flex-col gap-2">
        <button
          onClick={onContinueAsGuest}
          className="w-full py-2 bg-[#001428] hover:bg-[#002246] active:scale-[0.98] border border-[#00488a]/40 text-slate-300 font-sans text-2xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#0285ff]" />
          <span>Continue Offline / As Guest</span>
        </button>
        <span className="text-[8px] text-slate-500 font-mono text-center block">
          Guests can use the local sandbox. No data leaves your machine.
        </span>
      </div>
    </div>
  );
}

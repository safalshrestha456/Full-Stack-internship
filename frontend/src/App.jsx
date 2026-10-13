import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '', agreeTerms: false });
  
  // Feedback states
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = 'Please provide a valid email format';
    
    if (!loginData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Welcome back, ${loginData.email.split('@')[0]}! (Validation passed)`);
    }, 1000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!registerData.name.trim()) newErrors.name = 'Full name is required';
    
    if (!registerData.email) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) newErrors.email = 'Please provide a valid email format';
    
    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!registerData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Account for ${registerData.name} ready for creation!`);
    }, 1000);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Decorative gradient glow effects */}
      <div className={`absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
        isDark ? 'bg-indigo-600/15' : 'bg-indigo-300/30'
      }`} />
      <div className={`absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
        isDark ? 'bg-purple-600/15' : 'bg-purple-300/30'
      }`} />

      {/* Top Header Floating Bar with Theme Switcher Button */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-6 z-10 px-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className={`font-bold tracking-tight text-lg ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            TaskFlow
          </span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle Theme"
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer shadow-sm ${
            isDark 
              ? 'bg-slate-900/80 border-slate-700/80 text-amber-300 hover:bg-slate-800 hover:border-slate-600' 
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 shadow-slate-200/50'
          }`}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-slate-200">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="text-slate-700">Dark Mode</span>
            </>
          )}
        </button>
      </header>

      {/* Main Container Card */}
      <main className={`w-full max-w-5xl rounded-3xl shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 overflow-hidden border backdrop-blur-xl ${
        isDark 
          ? 'bg-slate-900/70 border-slate-800/80 shadow-black/40' 
          : 'bg-white/90 border-slate-200/90 shadow-indigo-100/60'
      }`}>
        
        {/* Left Side: Branding, Visual Pitch & Features */}
        <div className={`lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r relative transition-colors duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-purple-950/70 border-slate-800/60' 
            : 'bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/70 border-slate-200/80'
        }`}>
          <div>
            {/* Logo in side panel */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className={`text-2xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent ${
                  isDark 
                    ? 'from-white via-indigo-200 to-indigo-400' 
                    : 'from-slate-900 via-indigo-900 to-indigo-600'
                }`}>
                  TaskFlow
                </span>
                <span className={`text-xs block font-medium tracking-wide uppercase ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Workspace Capstone
                </span>
              </div>
            </div>

            {/* Value Proposition */}
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 leading-snug ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Organize your tasks with clarity & precision.
            </h1>
            <p className={`text-sm leading-relaxed mb-8 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              A centralized, relational platform tailored for university coursework, internship deliverables, and high-impact personal projects.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className={`p-1 rounded-lg mt-0.5 ${
                  isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    User Isolation & Data Privacy
                  </h4>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Strict owner-based authorization so only you access your tasks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`p-1 rounded-lg mt-0.5 ${
                  isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    GraphQL & Apollo Speed
                  </h4>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Fast queries, cached mutations, and optimistic state updates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`p-1 rounded-lg mt-0.5 ${
                  isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    Relational PostgreSQL Engine
                  </h4>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Robust schema with status checks, due date constraints, and indexes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Internship Footer Badge */}
          <div className={`mt-8 pt-6 border-t flex items-center justify-between text-xs ${
            isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> PostgreSQL & JWT Protected
            </span>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
              isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
            }`}>
              v1.0
            </span>
          </div>
        </div>

        {/* Right Side: Authentication Tabs & Forms */}
        <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center transition-colors duration-300 ${
          isDark ? 'bg-slate-900/50' : 'bg-white'
        }`}>
          
          {/* Tab Selector Switcher */}
          <div className={`flex p-1.5 rounded-2xl mb-8 max-w-md mx-auto w-full transition-colors duration-300 border ${
            isDark 
              ? 'bg-slate-950/60 border-slate-800/90' 
              : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => switchTab('login')}
              type="button"
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/20'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab('register')}
              type="button"
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/20'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback Messages */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center gap-3 text-sm animate-fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form Header */}
          <div className="mb-6">
            <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {activeTab === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {activeTab === 'login'
                ? 'Enter your credentials to access your personal dashboard.'
                : 'Get started in seconds and track your daily tasks effortlessly.'}
            </p>
          </div>

          {/* ======================= LOGIN FORM ======================= */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="student@internship.dev"
                    className={`w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none transition ${
                      isDark 
                        ? 'bg-slate-950/80 text-slate-100 placeholder-slate-500 border-slate-800 focus:border-indigo-500' 
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-indigo-600 focus:bg-white'
                    } border ${
                      errors.email ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500' : 'focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Password
                  </label>
                  <a href="#forgot" className="text-xs text-indigo-600 hover:text-indigo-500 font-medium transition">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className={`w-full rounded-xl py-3 pl-10 pr-11 text-sm outline-none transition ${
                      isDark 
                        ? 'bg-slate-950/80 text-slate-100 placeholder-slate-500 border-slate-800 focus:border-indigo-500' 
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-indigo-600 focus:bg-white'
                    } border ${
                      errors.password ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500' : 'focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={loginData.rememberMe}
                  onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="remember-me" className={`ml-2.5 text-xs cursor-pointer select-none ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Keep me signed in for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ===================== REGISTER FORM ===================== */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className={`w-full rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition ${
                      isDark 
                        ? 'bg-slate-950/80 text-slate-100 placeholder-slate-500 border-slate-800 focus:border-indigo-500' 
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-indigo-600 focus:bg-white'
                    } border ${
                      errors.name ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500' : 'focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="alex@internship.dev"
                    className={`w-full rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition ${
                      isDark 
                        ? 'bg-slate-950/80 text-slate-100 placeholder-slate-500 border-slate-800 focus:border-indigo-500' 
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-indigo-600 focus:bg-white'
                    } border ${
                      errors.email ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500' : 'focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="Min 8 chars"
                      className={`w-full rounded-xl py-2.5 pl-10 pr-9 text-sm outline-none transition ${
                        isDark 
                          ? 'bg-slate-950/80 text-slate-100 placeholder-slate-500 border-slate-800 focus:border-indigo-500' 
                          : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-indigo-600 focus:bg-white'
                      } border ${
                        errors.password ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500' : 'focus:ring-1 focus:ring-indigo-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      className={`w-full rounded-xl py-2.5 pl-10 pr-9 text-sm outline-none transition ${
                        isDark 
                          ? 'bg-slate-950/80 text-slate-100 placeholder-slate-500 border-slate-800 focus:border-indigo-500' 
                          : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-indigo-600 focus:bg-white'
                      } border ${
                        errors.confirmPassword ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500' : 'focus:ring-1 focus:ring-indigo-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms checkbox */}
              <div>
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={registerData.agreeTerms}
                    onChange={(e) => setRegisterData({ ...registerData, agreeTerms: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="terms" className={`ml-2.5 text-xs cursor-pointer select-none leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    I agree to the <span className="text-indigo-600 hover:underline">Terms of Service</span> and <span className="text-indigo-600 hover:underline">Privacy Policy</span>.
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create TaskFlow Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer switch prompt */}
          <div className="mt-6 text-center text-xs">
            {activeTab === 'login' ? (
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                Don't have an account yet?{' '}
                <button
                  onClick={() => switchTab('register')}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer transition"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                Already have an account?{' '}
                <button
                  onClick={() => switchTab('login')}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer transition"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

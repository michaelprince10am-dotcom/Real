import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { Globe, Sun, Moon } from 'lucide-react';
import { LanguageCode } from '../types';

export const Footer: React.FC = () => {
  const { language, setLanguageCode, languages } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { setActiveView } = useApp();

  return (
    <footer className="bg-neutral-900 dark:bg-black text-neutral-300 dark:text-white/70 border-t border-neutral-800 dark:border-white/5 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Global Impact Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-neutral-800 dark:border-white/5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-white/40 font-medium">Global Impact</span>
            <span className="text-3xl font-serif text-[#D4AF37]">
              50K+ <span className="text-xs font-sans uppercase tracking-widest text-neutral-200 dark:text-white/80 ml-2 font-semibold">Active Students</span>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-white/40 font-medium">Global Reach</span>
            <span className="text-3xl font-serif text-[#D4AF37]">
              120+ <span className="text-xs font-sans uppercase tracking-widest text-neutral-200 dark:text-white/80 ml-2 font-semibold">Countries Enrolled</span>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-white/40 font-medium">Knowledge Base</span>
            <span className="text-3xl font-serif text-[#D4AF37]">
              500+ <span className="text-xs font-sans uppercase tracking-widest text-neutral-200 dark:text-white/80 ml-2 font-semibold">Free Resources</span>
            </span>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => setActiveView('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <span className="font-serif text-2xl tracking-tighter text-[#D4AF37]">
                SONUS <span className="font-sans text-[10px] tracking-[0.3em] text-neutral-200 dark:text-white/80 uppercase">FOUNDATION</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 dark:text-white/50 leading-relaxed max-w-sm">
              An independent non-profit foundation dedicated to democratizing music education, artist mentorship, and sound engineering tools for creators worldwide.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="relative inline-block">
                <select
                  value={language.code}
                  onChange={(e) => setLanguageCode(e.target.value as LanguageCode)}
                  className="px-3 py-1.5 bg-neutral-800 dark:bg-white/10 border border-neutral-700 dark:border-white/10 rounded-full text-[10px] tracking-widest cursor-pointer text-neutral-200 dark:text-white/80 uppercase font-medium focus:outline-none"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-neutral-900 text-white">
                      {lang.flag} {lang.nativeName} ({lang.code.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-full border border-neutral-700 dark:border-white/10 flex items-center justify-center cursor-pointer hover:bg-neutral-800 dark:hover:bg-white/5 text-neutral-200 dark:text-white/80 transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Moon className="w-3.5 h-3.5 text-neutral-200" />}
              </button>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-4">
              Academy
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 dark:text-white/60">
              <li>
                <button onClick={() => setActiveView('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Free Courses
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('academy')} className="hover:text-white transition-colors cursor-pointer">
                  16 Disciplines
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('resources')} className="hover:text-white transition-colors cursor-pointer">
                  Theory Cheat Sheets
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('resources')} className="hover:text-white transition-colors cursor-pointer">
                  DAW Templates
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-4">
              Mentorship
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 dark:text-white/60">
              <li>
                <button onClick={() => setActiveView('artists')} className="hover:text-white transition-colors cursor-pointer">
                  Global Artist Roster
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('artists')} className="hover:text-white transition-colors cursor-pointer">
                  Book 1-on-1 Session
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('events')} className="hover:text-white transition-colors cursor-pointer">
                  Live Masterclasses
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-white transition-colors cursor-pointer">
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-4">
              Foundation
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 dark:text-white/60">
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-white transition-colors cursor-pointer">
                  Mission & Story
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('resources')} className="hover:text-white transition-colors cursor-pointer">
                  Equipment Grants & Resources
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-neutral-500 dark:text-white/40">
          <div>
            © {new Date().getFullYear()} SONUS Foundation. All rights reserved. Registered 501(c)(3) Global Non-Profit.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Grant Transparency</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

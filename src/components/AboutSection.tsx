import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Globe, Award, Heart, ShieldCheck, Sparkles, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveView } = useApp();

  const leadership = [
    {
      name: 'Dr. Marcus Vance',
      role: 'Executive Director & Head of Composition',
      bio: 'Former conservatory dean with 25 years in international music education policy.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Amina Diallo',
      role: 'Global Curriculum Chair',
      bio: 'Grammy-nominated producer advocating for accessible production technology.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Mateo Silva',
      role: 'Director of Audio Technology',
      bio: 'Pioneer in low-latency remote audio collaboration and acoustic research.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Story Banner */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>ABOUT AURA FOUNDATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            Democratizing World-Class Music Education Worldwide.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Founded by a global coalition of musicians, educators, and producers, Aura Foundation operates as an independent non-profit entity dedicated to cultivating raw musical talent regardless of socioeconomic status, ethnicity, or geographical location.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <Globe className="w-8 h-8 text-amber-500" />
            <h3 className="text-lg font-bold">Global Equalizer</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Connecting students in underserved regions directly with world-class mentors and studio production resources.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <Award className="w-8 h-8 text-amber-500" />
            <h3 className="text-lg font-bold">Artistic Integrity</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Championing original artistic expression, sonic identity, and sustainable career longevity in the music industry.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            <h3 className="text-lg font-bold">Transparent Non-Profit</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              100% of donations and foundation revenues directly subsidize equipment grants, studio hardware, and free courses.
            </p>
          </div>
        </div>

        {/* Leadership */}
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-neutral-50 mb-8 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" />
            Executive Board & Global Mentors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <div key={i} className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center gap-4">
                <img
                  src={leader.avatar}
                  alt={leader.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-amber-500/40 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{leader.name}</h4>
                  <p className="text-xs font-mono text-amber-500 font-bold mt-0.5">{leader.role}</p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 rounded-3xl bg-amber-500 text-neutral-950 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">Partner With Aura Foundation</h3>
            <p className="text-xs text-neutral-900 font-medium mt-1 max-w-xl">
              We collaborate with international conservatories, record labels, audio technology brands, and cultural ministries to build state-of-the-art music learning hubs.
            </p>
          </div>
          <button
            onClick={() => setActiveView('courses')}
            className="px-8 py-3.5 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
          >
            Explore Free Courses
          </button>
        </div>

      </div>
    </section>
  );
};

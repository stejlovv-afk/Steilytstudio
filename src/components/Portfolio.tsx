import React, { useState } from 'react';
import { Smartphone, Laptop, ArrowRight, ExternalLink, Sparkles, Play, CheckCircle2, Star, Layers, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { localizedData } from '../data/localizedData';
import { ProjectCase } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

interface PortfolioProps {
  onOpenCalculator: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenCalculator }) => {
  const [selectedCase, setSelectedCase] = useState<ProjectCase | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'test' | 'details'>('test');
  const [activeFilter, setActiveFilter] = useState<'all' | 'tma' | 'web'>('all');
  const { language, t } = useLanguage();

  const portfolioList = localizedData[language].portfolio;

  const filteredProjects = activeFilter === 'all'
    ? portfolioList
    : portfolioList.filter(p => p.type === activeFilter);

  const filterTabs = [
    { id: 'all', label: t.portfolio.filterAll },
    { id: 'tma', label: t.portfolio.filterTma },
    { id: 'web', label: t.portfolio.filterWeb },
  ] as const;

  const handleOpenTest = (project: ProjectCase) => {
    setModalInitialTab('test');
    setSelectedCase(project);
  };

  const handleOpenDetails = (project: ProjectCase) => {
    setModalInitialTab('details');
    setSelectedCase(project);
  };

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#0A0F1D] relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 px-4 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
              <span>{t.portfolio.badge}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              {t.portfolio.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* Filter Tabs with Smooth Floating Pill */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 rounded-2xl sm:rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 sm:p-1.5 self-stretch sm:self-start md:self-auto shadow-xs max-w-full overflow-x-auto">
            {filterTabs.map(tab => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`relative px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs font-bold transition-all whitespace-nowrap min-h-[38px] flex-1 sm:flex-initial text-center ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 bg-blue-600 rounded-xl sm:rounded-full shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* 2x2 Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} direction="up" delay={index * 0.1}>
              <div 
                id={`project-${project.id}`}
                className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-7 shadow-xs hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Bar: Icon + Category + High-Impact Metric */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        {project.type === 'tma' ? <Smartphone className="h-4 w-4" /> : <Laptop className="h-4 w-4" />}
                      </div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300">
                      <Activity className="h-3 w-3" />
                      <span className="text-xs font-extrabold">{project.metric}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mb-4 leading-relaxed">
                    {project.subtitle}
                  </p>

                  {/* Interactive App Screen Simulation Frame */}
                  <div className="relative mb-5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-inner aspect-[16/9] flex items-center justify-center group/screen">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/80 via-slate-950 to-slate-900" />
                    
                    {/* Visual Mock Badge */}
                    <div className="relative z-10 text-center px-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-600/40 group-hover/screen:scale-110 transition-transform">
                        <Play className="h-6 w-6 ml-0.5 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-white block">
                        {t.portfolio.testDriveBtn}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {project.type === 'tma' ? 'Telegram Mini App (Web)' : 'Web Platform & Fast UI'}
                      </span>
                    </div>

                    {/* Quick Trigger Click Overlay */}
                    <button
                      type="button"
                      onClick={() => handleOpenTest(project)}
                      className="absolute inset-0 z-20 cursor-pointer"
                      aria-label={`${t.portfolio.testDriveBtn} ${project.name}`}
                    />
                  </div>

                  {/* Highlights / Features List */}
                  <div className="space-y-2 mb-6">
                    {project.featuresList.slice(0, 3).map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="rounded-md bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenDetails(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 px-1"
                  >
                    <span>{t.portfolio.detailsBtn}</span>
                    <Layers className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => handleOpenTest(project)}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 sm:px-5 py-2.5 text-xs font-bold text-white shadow-sm active:scale-95 transition-all min-h-[40px]"
                  >
                    <span>{t.portfolio.testDriveBtn}</span>
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Case Study Modal with interactive test drive */}
      <AnimatePresence>
        {selectedCase && (
          <CaseStudyModal
            project={selectedCase}
            initialTab={modalInitialTab}
            onClose={() => setSelectedCase(null)}
            onOrderSimilar={() => {
              setSelectedCase(null);
              onOpenCalculator();
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

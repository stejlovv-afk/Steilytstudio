import React, { useState } from 'react';
import { Smartphone, Laptop, ArrowRight, ExternalLink, Sparkles, Play, CheckCircle2, Star, Layers, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data/agencyData';
import { ProjectCase } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { ScrollReveal } from './ScrollReveal';

interface PortfolioProps {
  onOpenCalculator: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenCalculator }) => {
  const [selectedCase, setSelectedCase] = useState<ProjectCase | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'test' | 'details'>('test');
  const [activeFilter, setActiveFilter] = useState<'all' | 'tma' | 'web'>('all');

  const filteredProjects = activeFilter === 'all'
    ? portfolioData
    : portfolioData.filter(p => p.type === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'Все примеры (4)' },
    { id: 'tma', label: 'Telegram Mini Apps' },
    { id: 'web', label: 'Сайты и Порталы' },
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
    <section id="portfolio" className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#0B101B]/80 relative overflow-hidden tech-grid border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-100/30 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-slate-200/40 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-1 text-xs font-mono font-bold text-slate-800 dark:text-cyan-400 mb-4 shadow-xs">
              <span>[ ПРИМЕРЫ РАБОТ И ДЕМО ]</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Примеры работ, которые вы получите
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
              Наглядные интерактивные примеры готовых решений: протестируйте скорость, пользовательские сценарии и качество реализации в симуляторе прямо сейчас.
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
                  className={`relative px-3 sm:px-4 py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap min-h-[38px] flex-1 sm:flex-initial text-center ${
                    isActive 
                      ? 'text-white dark:text-black font-black' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePortfolioTabPill"
                      className="absolute inset-0 bg-black dark:bg-[#00E5FF] rounded-xl sm:rounded-full shadow-md"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Projects Gallery with Smooth Animated Layout (2x2 Grid) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isTma = project.type === 'tma';
              const isGlobalTrade = project.id === 'global-trade';
              const isFitTrack = project.id === 'fittrack';
              const isUrbanLunch = project.id === 'urban-lunch';
              const isLumina = project.id === 'lumina-booking';

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  id={`project-card-${project.id}`}
                  className="group rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-7 flex flex-col justify-between hover:border-black dark:hover:border-[#00E5FF] transition-all duration-300 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(0,229,255,0.12)]"
                >
                  <div>
                    {/* Visual Mockup Container (Smartphone / Laptop) */}
                    <div 
                      onClick={() => handleOpenTest(project)}
                      className="relative mb-6 rounded-2xl bg-slate-900 dark:bg-black border border-slate-800 dark:border-slate-800 p-4 h-60 flex items-center justify-center overflow-hidden transition-colors cursor-pointer group-hover:border-black dark:group-hover:border-[#00E5FF]"
                    >
                      {/* Background glow in card */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/10 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity" />

                      {/* Interactive Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <div className="flex items-center gap-2 rounded-xl bg-[#00E5FF] px-4 py-2 text-xs font-black text-black shadow-lg">
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Протестировать пример</span>
                        </div>
                      </div>

                      {/* Smartphone Mockup for TMA projects */}
                      {isTma && (
                        <div className="relative w-44 rounded-2xl border-[2px] border-slate-700 bg-[#121215] p-2 shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 text-white">
                          {/* Telegram Header */}
                          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
                            <span className="text-[8px] text-[#00E5FF] font-mono font-bold">Telegram Mini App</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />
                          </div>
                          
                          {/* App Content Preview */}
                          {isUrbanLunch && (
                            <div className="space-y-1.5">
                              <div className="rounded-lg bg-[#1c1c22] p-2 border border-white/5 flex items-center justify-between">
                                <div>
                                  <div className="text-[10px] font-bold text-white flex items-center gap-1">
                                    <span>🍔 Urban Lunch</span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                  </div>
                                  <div className="text-[8px] text-gray-400">⏱ 25 мин • Москва-Сити</div>
                                </div>
                                <span className="rounded bg-[#00E5FF]/20 text-[#00E5FF] text-[8px] font-bold px-1.5 py-0.5 font-mono">-15%</span>
                              </div>
                              <div className="rounded-lg bg-white/5 p-1.5 flex items-center justify-between text-[9px]">
                                <span className="truncate pr-1 text-gray-200">Cyber Burger Supreme</span>
                                <span className="text-[#00E5FF] font-bold font-mono">490 ₽</span>
                              </div>
                              <div className="rounded-lg bg-[#00E5FF] py-1 text-center text-[9px] font-bold text-black shadow-sm">
                                ⚡ Оформить заказ СБП
                              </div>
                            </div>
                          )}

                          {isFitTrack && (
                            <div className="space-y-1.5">
                              <div className="rounded-lg bg-[#1c1c22] p-2 border border-white/5">
                                <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                                  <Activity className="h-3 w-3" />
                                  <span>FitTrack Club</span>
                                </div>
                                <div className="text-[8px] text-gray-400">Абонемент #84920 (Активен)</div>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-[8px] text-center">
                                <div className="rounded bg-white/5 p-1">
                                  <div className="text-white font-bold">14</div>
                                  <div className="text-gray-400">тренировок</div>
                                </div>
                                <div className="rounded bg-white/5 p-1">
                                  <div className="text-emerald-400 font-bold">2 450</div>
                                  <div className="text-gray-400">баллов</div>
                                </div>
                              </div>
                              <div className="rounded-lg bg-emerald-500 py-1 text-center text-[9px] font-bold text-black">
                                QR-вход в клуб
                              </div>
                            </div>
                          )}

                          {isLumina && (
                            <div className="space-y-1.5">
                              <div className="rounded-lg bg-[#1c1c22] p-2 border border-white/5">
                                <div className="text-[10px] font-bold text-pink-400 flex items-center gap-1">
                                  <span>✨ Lumina Booking</span>
                                </div>
                                <div className="text-[8px] text-gray-400">Запись: 18 авг в 13:30</div>
                              </div>
                              <div className="rounded-lg bg-white/5 p-1.5 flex items-center justify-between text-[9px]">
                                <span>Мастер Алена С.</span>
                                <span className="text-pink-300 font-bold">5.0 ★</span>
                              </div>
                              <div className="rounded-lg bg-gradient-to-r from-pink-500 to-[#00E5FF] py-1 text-center text-[9px] font-bold text-black">
                                Бронь слота в 1 тап
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Laptop Mockup for Web Platform project */}
                      {isGlobalTrade && (
                        <div className="relative w-56 rounded-xl border-[2px] border-slate-700 bg-[#121215] p-2 shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 text-white">
                          <div className="flex items-center gap-1 pb-1 mb-1.5 border-b border-white/10">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[8px] text-gray-400 font-mono ml-1">trade-hub.io</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[9px] font-bold">
                              <span>Global Logistics B2B</span>
                              <span className="text-cyan-400 font-mono">14 стран</span>
                            </div>
                            <div className="h-10 rounded bg-[#1c1c22] p-1 border border-white/5 flex items-center justify-center">
                              <div className="text-[8px] text-gray-400 text-center font-mono">
                                [ Таможенный калькулятор & CRM ]
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-[8px] text-gray-300">
                              <span>Онлайн-трекинг</span>
                              <span className="text-emerald-400 font-bold">+180% лидов</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Meta Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 px-3 py-0.5 text-[11px] font-bold text-slate-900 dark:text-slate-200">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                        {isTma ? '● Telegram Mini App' : '● Web Platform'}
                      </span>
                    </div>

                    {/* Case Title */}
                    <h3 className="font-display text-xl font-black text-slate-950 dark:text-white mb-2 group-hover:text-black dark:group-hover:text-[#00E5FF] transition-colors">
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-2">
                      {project.subtitle}
                    </p>

                    {/* Key Metrics Pill Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {project.results.slice(0, 2).map((res, i) => (
                        <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 p-2.5">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">{res.label}</span>
                          <span className="font-display text-sm font-black text-slate-950 dark:text-white">{res.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenTest(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-black dark:bg-[#00E5FF] py-2.5 sm:py-2.5 text-xs font-bold text-white dark:text-black hover:bg-slate-800 dark:hover:bg-cyan-300 active:scale-95 transition-all shadow-sm min-h-[44px]"
                    >
                      <Play className="h-3.5 w-3.5 fill-current text-[#00E5FF] dark:text-black" />
                      <span>Тест-драйв</span>
                    </button>

                    <button
                      onClick={() => handleOpenDetails(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 sm:py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-black dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all min-h-[44px]"
                    >
                      <span>Разбор</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Portfolio CTA */}
        <ScrollReveal direction="up" delay={0.2} className="mt-10 sm:mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 sm:p-6 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] w-full sm:w-auto">
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white text-center sm:text-left">
              Хотите получить готовый продукт такого уровня под задачи вашего бизнеса?
            </span>
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black dark:bg-[#00E5FF] px-5 sm:px-6 py-3 text-xs font-bold text-white dark:text-black hover:bg-slate-800 dark:hover:bg-cyan-300 active:scale-95 transition-all shadow-md w-full sm:w-auto shrink-0 min-h-[44px]"
            >
              <span>Рассчитать стоимость проекта</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#00E5FF] dark:text-black" />
            </button>
          </div>
        </ScrollReveal>

      </div>

      {/* Interactive Case Study Modal */}
      <CaseStudyModal
        project={selectedCase}
        initialTab={modalInitialTab}
        onClose={() => setSelectedCase(null)}
        onOrderSimilar={(projectType) => {
          setSelectedCase(null);
          onOpenCalculator();
        }}
      />
    </section>
  );
};

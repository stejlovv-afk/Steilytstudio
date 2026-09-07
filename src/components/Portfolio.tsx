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
    <section id="portfolio" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#0A0F1D] relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 px-4 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
              <span>Портфолио и примеры</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Примеры наших работ
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
              Нажмите «Тест-драйв» у любого проекта, чтобы сразу открыть интерактивное приложение и проверить, как всё работает.
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
                      ? 'text-white font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePortfolioTabPill"
                      className="absolute inset-0 bg-blue-600 rounded-xl sm:rounded-full shadow-md shadow-blue-600/20"
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
                  className="group rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-7 flex flex-col justify-between hover:border-blue-500 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-blue-500/5"
                >
                  <div>
                    {/* Visual Mockup Container (Smartphone / Laptop) */}
                    <div 
                      onClick={() => handleOpenTest(project)}
                      className="relative mb-6 rounded-2xl bg-slate-900 dark:bg-black border border-slate-800 dark:border-slate-800 p-4 h-60 flex items-center justify-center overflow-hidden transition-colors cursor-pointer group-hover:border-blue-500/50"
                    >
                      {/* Background glow in card */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity" />

                      {/* Interactive Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <div className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30">
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Запустить тест-драйв</span>
                        </div>
                      </div>

                      {/* Smartphone Mockup for TMA projects */}
                      {isTma && (
                        <div className="relative w-44 rounded-2xl border-[2px] border-slate-700 bg-[#121215] p-2 shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 text-white">
                          {/* Telegram Header */}
                          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
                            <span className="text-[8px] text-blue-400 font-bold">Telegram Mini App</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
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
                                  <div className="text-[8px] text-gray-400">⏱ 25 мин • Экспресс-доставка</div>
                                </div>
                                <span className="rounded bg-blue-600/20 text-blue-400 text-[8px] font-bold px-1.5 py-0.5">-15%</span>
                              </div>
                              <div className="rounded-lg bg-white/5 p-1.5 flex items-center justify-between text-[9px]">
                                <span className="truncate pr-1 text-gray-200">Бургер Black Angus</span>
                                <span className="text-blue-400 font-bold">490 ₽</span>
                              </div>
                              <div className="rounded-lg bg-blue-600 py-1 text-center text-[9px] font-bold text-white shadow-sm">
                                ⚡ Оформить заказ СБП
                              </div>
                            </div>
                          )}

                          {isFitTrack && (
                            <div className="space-y-1.5">
                              <div className="rounded-lg bg-[#1c1c22] p-2 border border-white/5 flex items-center justify-between">
                                <div>
                                  <div className="text-[10px] font-bold text-white flex items-center gap-1">
                                    <span>🛍️ Nordic Store</span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                  </div>
                                  <div className="text-[8px] text-gray-400">Одежда & Снаряжение</div>
                                </div>
                                <span className="rounded bg-blue-600/20 text-blue-400 text-[8px] font-bold px-1.5 py-0.5">SALE15</span>
                              </div>
                              <div className="rounded-lg bg-white/5 p-1.5 flex items-center justify-between text-[9px]">
                                <span className="truncate pr-1 text-gray-200">Худи Oversize Heavy</span>
                                <span className="text-blue-400 font-bold">4 890 ₽</span>
                              </div>
                              <div className="rounded-lg bg-blue-600 py-1 text-center text-[9px] font-bold text-white shadow-sm">
                                ⚡ Оплата СБП в 1 клик
                              </div>
                            </div>
                          )}

                          {isLumina && (
                            <div className="space-y-1.5">
                              <div className="rounded-lg bg-[#1c1c22] p-2 border border-white/5 flex items-center justify-between">
                                <div>
                                  <div className="text-[10px] font-bold text-pink-300 flex items-center gap-1">
                                    <span>✨ Lumina Beauty</span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                                  </div>
                                  <div className="text-[8px] text-gray-400">Запись: 18 авг в 14:00</div>
                                </div>
                                <span className="rounded bg-pink-500/20 text-pink-300 text-[8px] font-bold px-1.5 py-0.5">5.0 ★</span>
                              </div>
                              <div className="rounded-lg bg-white/5 p-1.5 flex items-center justify-between text-[9px]">
                                <span className="truncate pr-1 text-gray-200">AirTouch / Мастер Алена</span>
                                <span className="text-blue-400 font-bold">8 500 ₽</span>
                              </div>
                              <div className="rounded-lg bg-blue-600 py-1 text-center text-[9px] font-bold text-white shadow-sm">
                                Электронный талон в Telegram
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
                            <span className="text-[8px] text-gray-400 font-mono ml-1">nordic-engineering.pro</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[9px] font-bold">
                              <span>Nordic Engineering B2B</span>
                              <span className="text-emerald-400">Speed 99/100</span>
                            </div>
                            <div className="h-11 rounded bg-[#1c1c22] p-1.5 border border-white/5 flex flex-col justify-center">
                              <div className="text-[8px] text-blue-400 font-bold">
                                📐 Интерактивный калькулятор сметы
                              </div>
                              <div className="text-[7px] text-gray-400">
                                180 м² • ~4.2 млн ₽ • Срок 45 дней
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-[8px] text-gray-300">
                              <span>Мгновенная заявка</span>
                              <span className="text-blue-400 font-bold">0.6 сек в Telegram</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Meta Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 px-3 py-0.5 text-xs font-semibold text-slate-900 dark:text-slate-200">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {isTma ? 'Telegram Mini App' : 'Сайт компании'}
                      </span>
                    </div>

                    {/* Case Title */}
                    <h3 className="font-display text-xl font-black text-slate-950 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 active:scale-95 transition-all min-h-[44px]"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Тест-драйв</span>
                    </button>

                    <button
                      onClick={() => handleOpenDetails(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all min-h-[44px]"
                    >
                      <span>Подробнее</span>
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 sm:p-6 shadow-xs w-full sm:w-auto">
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white text-center sm:text-left">
              Хотите заказать похожий сайт или Telegram-бота под ваши задачи?
            </span>
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 sm:px-6 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 active:scale-95 transition-all w-full sm:w-auto shrink-0 min-h-[44px]"
            >
              <span>Рассчитать стоимость проекта</span>
              <ArrowRight className="h-3.5 w-3.5" />
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

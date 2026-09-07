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

        {/* Projects Gallery (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const isTma = project.type === 'tma';
              const isGlobalTrade = project.id === 'global-trade';
              const isFitTrack = project.id === 'fittrack';
              const isUrbanLunch = project.id === 'urban-lunch';
              const isLumina = project.id === 'lumina-booking';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  id={`project-card-${project.id}`}
                  className="group rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-7 flex flex-col justify-between hover:border-blue-500 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-blue-500/5"
                >
                  <div>
                    {/* Visual Mockup Container (Thematic Smartphone / Laptop Mockup) */}
                    <div 
                      onClick={() => handleOpenTest(project)}
                      className={`relative mb-6 rounded-2xl p-4 sm:p-5 h-64 sm:h-72 flex items-center justify-center overflow-hidden transition-all duration-500 cursor-pointer border group-hover:scale-[1.01] ${
                        isUrbanLunch 
                          ? 'bg-gradient-to-b from-[#18130E] via-[#120F0B] to-[#0A0806] border-amber-900/30 group-hover:border-amber-500/50' 
                          : isFitTrack
                          ? 'bg-gradient-to-b from-[#0B1120] via-[#090D18] to-[#05070D] border-blue-900/30 group-hover:border-blue-500/50'
                          : isLumina
                          ? 'bg-gradient-to-b from-[#1A1016] via-[#120B10] to-[#0A0609] border-rose-900/30 group-hover:border-rose-500/50'
                          : 'bg-gradient-to-b from-[#0A1222] via-[#070D18] to-[#040811] border-cyan-900/30 group-hover:border-cyan-500/50'
                      }`}
                    >
                      {/* Atmospheric Thematic Background Glows */}
                      {isUrbanLunch && (
                        <>
                          <div className="absolute top-0 right-0 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
                          {/* Floating badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold backdrop-blur-md">
                            <span>🔥 Хит доставки</span>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-slate-300 text-[9px] font-mono backdrop-blur-md">
                            <span>⚡ СБП в 1 клик</span>
                          </div>
                        </>
                      )}

                      {isFitTrack && (
                        <>
                          <div className="absolute top-0 right-0 w-52 h-52 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
                          {/* Floating badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-bold backdrop-blur-md">
                            <span>🛍️ Streetwear & Tech</span>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-slate-300 text-[9px] font-mono backdrop-blur-md">
                            <span>📦 СДЭК Трекинг</span>
                          </div>
                        </>
                      )}

                      {isLumina && (
                        <>
                          <div className="absolute top-0 right-0 w-52 h-52 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
                          {/* Floating badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-bold backdrop-blur-md">
                            <span>✨ Премиум SPA & Салон</span>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-rose-200 text-[9px] font-mono backdrop-blur-md">
                            <span>⭐️ Рейтинг 5.0</span>
                          </div>
                        </>
                      )}

                      {isGlobalTrade && (
                        <>
                          <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
                          {/* Floating badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold backdrop-blur-md">
                            <span>🏢 B2B Инжиниринг</span>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9px] font-mono backdrop-blur-md">
                            <span>⚡ Speed 99/100</span>
                          </div>
                        </>
                      )}

                      {/* Interactive Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                        <div className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow-xl shadow-blue-600/40 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Play className="h-4 w-4 fill-current" />
                          <span>Запустить тест-драйв</span>
                        </div>
                      </div>

                      {/* Smartphone Mockup for Urban Lunch (Food delivery) */}
                      {isUrbanLunch && (
                        <div className="relative w-52 sm:w-56 rounded-[22px] border-[2px] border-amber-900/60 bg-[#16120F] p-2.5 shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 text-white">
                          {/* Telegram Header */}
                          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-amber-500/15">
                            <div className="flex items-center gap-1.5">
                              <div className="h-2 w-2 rounded-full bg-amber-500" />
                              <span className="text-[9px] text-amber-400 font-bold font-mono">Urban Lunch Gourmet</span>
                            </div>
                            <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">25 мин</span>
                          </div>
                          
                          {/* Mini Card with real appetizing photo */}
                          <div className="rounded-xl bg-[#221A15] border border-amber-500/20 overflow-hidden mb-2">
                            <div className="relative h-20 w-full overflow-hidden">
                              <img 
                                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" 
                                alt="Burger"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1.5 right-1.5 rounded-md bg-orange-600 px-1.5 py-0.5 text-[8px] font-black text-white shadow">
                                -15% СБП
                              </div>
                              <div className="absolute bottom-1 left-1.5 flex items-center gap-1 text-[8px] bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded text-amber-300 font-bold">
                                <span>★ 4.95</span>
                                <span className="text-gray-400">(420)</span>
                              </div>
                            </div>
                            <div className="p-2 flex items-center justify-between">
                              <div>
                                <div className="text-[10px] font-bold text-white leading-tight">Cyber Burger Supreme</div>
                                <div className="text-[8px] text-gray-400">Black Angus • Трюфель</div>
                              </div>
                              <span className="text-[11px] font-black font-mono text-amber-400">490 ₽</span>
                            </div>
                          </div>

                          {/* Quick delivery tracker widget */}
                          <div className="rounded-lg bg-black/40 border border-white/5 p-1.5 flex items-center justify-between text-[8px]">
                            <div className="flex items-center gap-1.5 text-gray-300">
                              <span className="text-amber-400">🛵</span>
                              <span>Курьер Сергей в пути</span>
                            </div>
                            <span className="text-amber-400 font-bold font-mono">18 мин</span>
                          </div>
                        </div>
                      )}

                      {/* Smartphone Mockup for Nordic Store (Streetwear & Gear) */}
                      {isFitTrack && (
                        <div className="relative w-52 sm:w-56 rounded-[22px] border-[2px] border-blue-900/60 bg-[#0E131F] p-2.5 shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 text-white">
                          {/* Telegram Header */}
                          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-blue-500/15">
                            <div className="flex items-center gap-1.5">
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                              <span className="text-[9px] text-blue-400 font-bold font-mono">Nordic Store Bot</span>
                            </div>
                            <span className="text-[8px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-bold">SALE15</span>
                          </div>
                          
                          {/* Mini Card with hoodie photo */}
                          <div className="rounded-xl bg-[#141B2D] border border-blue-500/20 overflow-hidden mb-2">
                            <div className="relative h-20 w-full overflow-hidden">
                              <img 
                                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80" 
                                alt="Hoodie"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1.5 right-1.5 rounded-md bg-blue-600 px-1.5 py-0.5 text-[8px] font-black text-white shadow">
                                Хит
                              </div>
                              <div className="absolute bottom-1 left-1.5 flex items-center gap-1 text-[8px] bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded text-blue-300 font-bold">
                                <span>Футер 480 г/м²</span>
                              </div>
                            </div>
                            <div className="p-2 flex items-center justify-between">
                              <div>
                                <div className="text-[10px] font-bold text-white leading-tight">Худи Oversize Heavy</div>
                                <div className="flex gap-1 mt-0.5">
                                  {['S', 'M', 'L', 'XL'].map((s) => (
                                    <span key={s} className="text-[7px] border border-white/10 px-1 rounded text-gray-300">{s}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-[11px] font-black font-mono text-blue-400 block">4 890 ₽</span>
                                <span className="text-[8px] text-gray-400 line-through">6 200 ₽</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick checkout bar */}
                          <div className="rounded-lg bg-blue-600 py-1.5 text-center text-[9px] font-bold text-white shadow-md shadow-blue-600/30 flex items-center justify-center gap-1">
                            <span>⚡ Оформить заказ СБП</span>
                          </div>
                        </div>
                      )}

                      {/* Smartphone Mockup for Lumina Beauty */}
                      {isLumina && (
                        <div className="relative w-52 sm:w-56 rounded-[22px] border-[2px] border-rose-900/60 bg-[#160E14] p-2.5 shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 text-white">
                          {/* Telegram Header */}
                          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-rose-500/15">
                            <div className="flex items-center gap-1.5">
                              <div className="h-2 w-2 rounded-full bg-rose-400" />
                              <span className="text-[9px] text-rose-300 font-bold font-mono">Lumina Beauty & SPA</span>
                            </div>
                            <span className="text-[8px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded font-bold">Онлайн-запись</span>
                          </div>
                          
                          {/* Specialist Card */}
                          <div className="rounded-xl bg-[#221520] border border-rose-500/20 p-2 mb-2 flex items-center gap-2">
                            <img 
                              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" 
                              alt="Master"
                              referrerPolicy="no-referrer"
                              className="h-11 w-11 rounded-lg object-cover border border-rose-400/30 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="text-[10px] font-bold text-white truncate">Алена Соколова</div>
                              <div className="text-[8px] text-rose-300/80">Топ-стилист • 7 лет</div>
                              <div className="flex items-center gap-1 text-[8px] text-amber-400 font-bold mt-0.5">
                                <span>★ 5.0</span>
                                <span className="text-gray-400">(142 записи)</span>
                              </div>
                            </div>
                          </div>

                          {/* Slot selection & confirmation */}
                          <div className="rounded-lg bg-black/40 border border-white/5 p-1.5 space-y-1">
                            <div className="flex justify-between text-[8px] text-gray-300">
                              <span>AirTouch / Balayage</span>
                              <span className="text-rose-300 font-bold">8 500 ₽</span>
                            </div>
                            <div className="flex justify-between items-center pt-1 border-t border-white/5 text-[8px]">
                              <span className="text-emerald-400">✓ Пн, 18 авг в 14:00</span>
                              <span className="text-[7px] bg-rose-500/20 text-rose-200 px-1 rounded">Талон готов</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Laptop Mockup for Nordic Engineering (B2B Web) */}
                      {isGlobalTrade && (
                        <div className="relative w-60 sm:w-64 rounded-xl border-[2px] border-cyan-900/60 bg-[#0C1424] p-2.5 shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 text-white">
                          {/* Browser Window Bar */}
                          <div className="flex items-center gap-1.5 pb-1.5 mb-2 border-b border-cyan-500/15">
                            <div className="h-2 w-2 rounded-full bg-rose-500/80" />
                            <div className="h-2 w-2 rounded-full bg-amber-500/80" />
                            <div className="h-2 w-2 rounded-full bg-emerald-500/80" />
                            <div className="flex-1 ml-1 px-2 py-0.5 rounded bg-black/50 border border-white/5 text-[8px] text-gray-300 font-mono flex items-center justify-between">
                              <span className="truncate">nordic-engineering.pro</span>
                              <span className="text-emerald-400 text-[7px]">🔒 SSL</span>
                            </div>
                          </div>
                          
                          {/* Engineering Portal Mini Content */}
                          <div className="space-y-1.5">
                            <div className="rounded-lg bg-[#142138] border border-cyan-500/20 p-2 flex items-center gap-2">
                              <img 
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80" 
                                alt="Office"
                                referrerPolicy="no-referrer"
                                className="h-10 w-14 rounded object-cover border border-white/10 shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="text-[9px] font-bold text-white truncate">Штаб-квартира IT 480 м²</div>
                                <div className="text-[7px] text-cyan-300">Срок: 45 дней • 5.4 млн ₽</div>
                                <div className="text-[7px] text-emerald-400 font-bold">Сдано в срок 100%</div>
                              </div>
                            </div>

                            {/* Mini Interactive Calculator Preview */}
                            <div className="rounded-lg bg-black/40 border border-white/5 p-1.5 flex items-center justify-between text-[8px]">
                              <div>
                                <span className="text-gray-400 block text-[7px]">Калькулятор сметы</span>
                                <span className="text-white font-bold">180 м² • Бизнес-пакет</span>
                              </div>
                              <div className="text-right">
                                <span className="text-cyan-300 font-mono font-bold block">4 200 000 ₽</span>
                                <span className="text-[7px] text-emerald-400">Экономия 12%</span>
                              </div>
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
        </div>

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

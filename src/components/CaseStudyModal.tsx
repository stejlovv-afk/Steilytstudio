import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Play, Layers, ShieldCheck, Zap, Server, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectCase } from '../types';
import { UrbanLunchTester } from './case-testers/UrbanLunchTester';
import { GlobalTradeTester } from './case-testers/GlobalTradeTester';
import { FitTrackTester } from './case-testers/FitTrackTester';
import { LuminaBookingTester } from './case-testers/LuminaBookingTester';

interface CaseStudyModalProps {
  project: ProjectCase | null;
  initialTab?: 'test' | 'details';
  onClose: () => void;
  onOrderSimilar: (projectType: 'tma' | 'web') => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ 
  project, 
  initialTab = 'test',
  onClose, 
  onOrderSimilar 
}) => {
  const [modalTab, setModalTab] = useState<'test' | 'details'>(initialTab);

  if (!project) return null;

  const renderCaseTester = () => {
    switch (project.id) {
      case 'urban-lunch':
        return <UrbanLunchTester />;
      case 'global-trade':
        return <GlobalTradeTester />;
      case 'fittrack':
        return <FitTrackTester />;
      case 'lumina-booking':
        return <LuminaBookingTester />;
      default:
        return <UrbanLunchTester />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e] p-3.5 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100 max-h-[96vh] sm:max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90 transition-all shadow-sm"
          aria-label="Закрыть окно"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 pr-10">
          <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-slate-900 dark:text-cyan-300">
            {project.category}
          </span>
          <span className="text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
            {project.type === 'tma' ? '● Telegram Mini App' : '● Corporate Web Platform'}
          </span>
        </div>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="pr-2">
            <h2 className="font-display text-xl sm:text-3xl font-black text-slate-950 dark:text-white leading-tight">
              {project.name} — {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 sm:flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setModalTab('test')}
              className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[38px] ${
                modalTab === 'test' ? 'text-white dark:text-black' : 'text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {modalTab === 'test' && (
                <motion.div
                  layoutId="activeModalTab"
                  className="absolute inset-0 bg-black dark:bg-[#00E5FF] rounded-xl shadow-md"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <Play className="h-3.5 w-3.5 relative z-10 fill-current text-[#00E5FF] dark:text-black" />
              <span className="relative z-10 text-center">Интерактивный тест</span>
            </button>

            <button
              onClick={() => setModalTab('details')}
              className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[38px] ${
                modalTab === 'details' ? 'text-white dark:text-black' : 'text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {modalTab === 'details' && (
                <motion.div
                  layoutId="activeModalTab"
                  className="absolute inset-0 bg-black dark:bg-[#00E5FF] rounded-xl shadow-md"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <Layers className="h-3.5 w-3.5 relative z-10" />
              <span className="relative z-10 text-center">Метрики и кейс</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {modalTab === 'test' && (
            <motion.div
              key="interactive-sandbox"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="mb-6 sm:mb-8"
            >
              <div className="rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-1 sm:p-4 text-white overflow-hidden">
                {renderCaseTester()}
              </div>
            </motion.div>
          )}

          {modalTab === 'details' && (
            <motion.div
              key="metrics-details"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Highlight Result Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {project.results.map((res, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 font-medium">{res.label}</span>
                    <span className="font-display text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                      {res.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-5 sm:p-6">
                  <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" />
                    Бизнес-задача
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-5 sm:p-6">
                  <h4 className="text-xs font-bold text-slate-950 dark:text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00B4D8] dark:bg-[#00E5FF]" />
                    Реализованное решение Steilyt Studio
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Features Implemented */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-3">
                  Функционал и возможности продукта:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.featuresList.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
                      <CheckCircle className="h-4 w-4 text-[#00B4D8] dark:text-[#00E5FF] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steilyt Architecture Standards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                  <Zap className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Мгновенный отклик</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Отрисовка UI &lt; 0.5s без подвисаний и белых экранов.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Безопасность оплат</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Сертифицированные шлюзы СБП, 54-ФЗ онлайн-чеки и интернет-эквайринг.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                  <Server className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Прямой API мост</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Синхронизация с 1C, iiko, YClients, CRM и базами данных.</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold block mb-2.5">Технологический стек проекта:</span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(t => (
                    <span key={t} className="rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Закрыть окно
          </button>

          <button
            onClick={() => {
              onClose();
              onOrderSimilar(project.type);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-black dark:bg-[#00E5FF] px-7 py-3 text-xs font-black text-white dark:text-black hover:bg-slate-800 dark:hover:bg-cyan-300 active:scale-95 transition-all shadow-md"
          >
            <span>Заказать аналогичный проект</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5] text-[#00E5FF] dark:text-black" />
          </button>
        </div>

      </div>
    </div>
  );
};

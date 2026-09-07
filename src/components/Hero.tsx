import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { TmaPhoneSimulator } from './TmaPhoneSimulator';

interface HeroProps {
  onOpenCalculator: () => void;
  onScrollToCases: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalculator, onScrollToCases }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden ambient-glow bg-[#F8FAFC] dark:bg-[#0A0F1D] transition-colors duration-300">
      
      {/* Soft Ambient Orbs in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[220px] sm:h-[380px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none -z-10 transition-all duration-500" />
      <div className="absolute bottom-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none -z-10 transition-all duration-500" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-1.5 backdrop-blur-md mb-5 sm:mb-6 shadow-xs"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Студия веб-разработки & Telegram
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                0% предоплаты
              </span>
            </motion.div>

            {/* Clear H1 Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.18] sm:leading-[1.12] mb-4 sm:mb-6"
            >
              Создаем <span className="text-blue-600 dark:text-blue-400">сайты и Telegram-боты</span>, которые приносят клиентов
            </motion.h1>

            {/* Clear Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal"
            >
              Понятные сайты для бизнеса, удобные магазины и запись на услуги прямо в Telegram. Приступаем к работе <strong className="font-semibold text-slate-900 dark:text-white">без предоплаты</strong>: вы платите только тогда, когда сайт готов и протестирован на вашем телефоне.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10"
            >
              <button
                id="hero-cta-button"
                onClick={onOpenCalculator}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-105 active:scale-[0.98] min-h-[48px]"
              >
                <span>Рассчитать стоимость проекта</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onScrollToCases}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 shadow-xs hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] min-h-[48px]"
              >
                <span>Посмотреть примеры и демо</span>
              </button>
            </motion.div>

            {/* Micro Highlights / Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-5 sm:pt-6 border-t border-slate-200 dark:border-slate-800 w-full"
            >
              <div className="flex flex-col p-3 sm:p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/90 dark:border-emerald-800/40 shadow-xs">
                <div className="text-base sm:text-2xl font-black font-display text-emerald-700 dark:text-emerald-400">
                  0 ₽ аванс
                </div>
                <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5 leading-tight">Оплата по результату</span>
              </div>

              <div className="flex flex-col p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-base sm:text-2xl font-black font-display text-blue-600 dark:text-blue-400">
                  от 5 дней
                </div>
                <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5 leading-tight">Быстрый запуск</span>
              </div>

              <div className="flex flex-col p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-base sm:text-2xl font-black font-display text-slate-950 dark:text-white">
                  в 2 клика
                </div>
                <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5 leading-tight">Удобно клиенту</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D-Animated Smartphone Mockup with functional Telegram Mini App */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <TmaPhoneSimulator />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

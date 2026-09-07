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
    <section id="hero" className="relative min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden tech-grid bg-white dark:bg-[#080C14] transition-colors duration-300">
      
      {/* Glow Orbs in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[220px] sm:h-[380px] bg-cyan-100/40 dark:bg-cyan-500/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none -z-10 transition-all duration-500" />
      <div className="absolute bottom-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-slate-200/40 dark:bg-blue-600/10 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none -z-10 transition-all duration-500" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tech Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 rounded-2xl sm:rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 px-3.5 py-1.5 backdrop-blur-md mb-5 sm:mb-6 shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B4D8] dark:bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B4D8] dark:bg-[#00E5FF]"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                Web3 & TMA Agency
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/60 px-2 py-0.5 rounded-full">
                0% предоплаты • Оплата по факту
              </span>
            </motion.div>

            {/* Exact H1 Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.18] sm:leading-[1.12] mb-4 sm:mb-6"
            >
              Разработка <span className="underline decoration-[#00E5FF] decoration-4 underline-offset-8">Telegram Mini Apps</span> и сайтов под ключ
            </motion.h1>

            {/* Exact Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal"
            >
              Превращаем ваш бизнес в успешный цифровой продукт. Повышаем продажи через Telegram, создаем конверсионные лендинги.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10"
            >
              {/* Exact CTA Button */}
              <button
                id="hero-cta-button"
                onClick={onOpenCalculator}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-black dark:bg-[#00E5FF] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white dark:text-black shadow-[0_10px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_25px_rgba(0,229,255,0.25)] transition-all duration-300 hover:bg-slate-800 dark:hover:bg-cyan-300 hover:scale-105 active:scale-[0.98] min-h-[48px]"
              >
                <span>Заказать расчет проекта</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5] text-[#00E5FF] dark:text-black transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onScrollToCases}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 shadow-xs hover:border-black dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] min-h-[48px]"
              >
                <span>Смотреть кейсы и тест-драйв</span>
              </button>
            </motion.div>

            {/* Micro Highlights / Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-5 sm:pt-6 border-t border-slate-200 dark:border-slate-800 w-full"
            >
              <div className="flex flex-col p-2.5 sm:p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 shadow-xs">
                <div className="text-base sm:text-2xl font-black font-display text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <span>0% аванс</span>
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse hidden xs:inline-block" />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5 leading-tight">Оплата по факту</span>
              </div>

              <div className="flex flex-col p-2.5 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="text-base sm:text-2xl font-black font-display text-black dark:text-[#00E5FF]">
                  14 дней
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-tight">Запуск MVP</span>
              </div>

              <div className="flex flex-col p-2.5 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="text-base sm:text-2xl font-black font-display text-slate-950 dark:text-white">
                  +30-40%
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-tight">Конверсия</span>
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

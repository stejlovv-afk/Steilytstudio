import React from 'react';
import { Users, TrendingUp, CreditCard, Zap, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { advantagesData } from '../data/agencyData';
import { ScrollReveal } from './ScrollReveal';

interface AdvantagesProps {
  onOpenCalculator: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Users: Users,
  TrendingUp: TrendingUp,
  CreditCard: CreditCard,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
};

export const Advantages: React.FC<AdvantagesProps> = ({ onOpenCalculator }) => {
  return (
    <section id="advantages" className="py-20 lg:py-28 bg-white dark:bg-[#080C14] relative overflow-hidden transition-colors duration-300">
      
      {/* Background radial gradient */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100/30 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-4 py-1 text-xs font-mono font-bold text-slate-800 dark:text-cyan-400 mb-4 shadow-xs">
            <span>[ ПОЧЕМУ CYBERPULSE ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Наши преимущества
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Сочетаем инженерную строгость, экспертизу в экосистеме Telegram и бескомпромиссное качество пользовательского опыта.
          </p>
        </ScrollReveal>

        {/* Cards Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {advantagesData.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Zap;
            return (
              <ScrollReveal key={item.id} direction="up" delay={index * 0.08} className="h-full">
                <div
                  id={`advantage-${item.id}`}
                  className="group rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-8 flex flex-col justify-between hover:border-black dark:hover:border-[#00E5FF] transition-all duration-300 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(0,229,255,0.12)] h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-[#00E5FF] group-hover:bg-black dark:group-hover:bg-[#00E5FF] group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-mono font-black text-slate-950 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        {item.statNumber}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-black text-slate-950 dark:text-white mb-1 group-hover:text-black dark:group-hover:text-[#00E5FF] transition-colors">
                      {item.title}
                    </h3>

                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium block mb-3">
                      {item.subtitle}
                    </span>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono font-semibold">
                    <span>{item.statLabel}</span>
                    <CheckCircle2 className="h-4 w-4 text-[#00B4D8] dark:text-[#00E5FF]" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Telegram Advantage Banner - High-Impact Deep Black Card */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="rounded-2xl sm:rounded-3xl border border-slate-800 dark:border-slate-700 bg-slate-950 dark:bg-[#0c121e] p-5 sm:p-12 relative overflow-hidden shadow-2xl text-white">
            {/* Subtle glow in dark card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-3 font-bold">
                  <Sparkles className="h-4 w-4" />
                  <span>ЭКОНОМИКА ВНИМАНИЯ В TELEGRAM</span>
                </div>
                <h3 className="font-display text-xl sm:text-3xl font-black text-white mb-3 sm:mb-4">
                  Почему Telegram Mini Apps конвертируют в 3 раза лучше обычных сайтов?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5 sm:mb-6">
                  Пользователю не нужно переходить во внешний браузер, вводить логины и пароли или скачивать тяжелые приложения из App Store. Авторизация происходит бесшовно через Telegram API, оплата — через СБП или карты в 1 касание, а встроенные Push-уведомления возвращают клиента без затрат на SMS.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                  <div className="rounded-xl sm:rounded-2xl bg-white/5 dark:bg-white/5 p-3 sm:p-3.5 border border-white/10">
                    <div className="text-sm sm:text-lg font-bold text-[#00E5FF]">0 секунд</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-300">На авторизацию и регистрацию</div>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white/5 dark:bg-white/5 p-3 sm:p-3.5 border border-white/10">
                    <div className="text-sm sm:text-lg font-bold text-white">0% комиссия</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-300">App Store & Google Play</div>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white/5 dark:bg-white/5 p-3 sm:p-3.5 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-sm sm:text-lg font-bold text-[#00E5FF]">98% Open Rate</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-300">У сервисных Telegram сообщений</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                <button
                  onClick={onOpenCalculator}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#00E5FF] px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-black text-black hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,229,255,0.3)] min-h-[48px]"
                >
                  <span>Рассчитать выгоду для бизнеса</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

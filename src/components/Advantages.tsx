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
    <section id="advantages" className="py-20 lg:py-28 bg-white dark:bg-[#0A0F1D] relative overflow-hidden transition-colors duration-300">
      
      {/* Background radial gradient */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 px-4 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
            <span>Наши преимущества</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Почему заказчики выбирают нас
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Делаем проекты, которые приносят реальные заказы и прибыль вашему бизнесу, без головной боли и задержек.
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
                  className="group rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-8 flex flex-col justify-between hover:border-blue-500 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200/80 dark:border-blue-900/50">
                        {item.statNumber}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-black text-slate-950 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>

                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-3">
                      {item.subtitle}
                    </span>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>{item.statLabel}</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Telegram Advantage Banner - High-Impact Deep Blue/Slate Card */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="rounded-2xl sm:rounded-3xl border border-blue-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5 sm:p-12 relative overflow-hidden shadow-2xl text-white">
            {/* Subtle glow in dark card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs text-blue-300 uppercase tracking-wider mb-3 font-bold">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <span>ПРЕИМУЩЕСТВА TELEGRAM ДЛЯ БИЗНЕСА</span>
                </div>
                <h3 className="font-display text-xl sm:text-3xl font-black text-white mb-3 sm:mb-4">
                  Почему Telegram Mini Apps приносят больше продаж, чем обычные сайты?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 sm:mb-6">
                  Клиенту не нужно выходить из Telegram, скачивать сторонние приложения или регистрироваться заново. Он открывает ваш магазин прямо в чате в 1 клик, оплачивает через СБП или банковскую карту за секунды, а вы получаете мгновенный канал связи с клиентом без затрат на SMS.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                  <div className="rounded-xl sm:rounded-2xl bg-white/5 p-3 sm:p-3.5 border border-white/10">
                    <div className="text-sm sm:text-lg font-bold text-blue-400">1 клик</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300">Вход без паролей и регистраций</div>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white/5 p-3 sm:p-3.5 border border-white/10">
                    <div className="text-sm sm:text-lg font-bold text-emerald-400">0% комиссии</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300">Без поборов App Store и Google</div>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white/5 p-3 sm:p-3.5 border border-white/10 col-span-2 sm:col-span-1">
                    <div className="text-sm sm:text-lg font-bold text-blue-400">98% прочтений</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300">Бесплатные уведомления клиенту</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                <button
                  onClick={onOpenCalculator}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-bold text-white active:scale-95 transition-all shadow-lg shadow-blue-600/30 min-h-[48px]"
                >
                  <span>Рассчитать стоимость для бизнеса</span>
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

import React from 'react';
import { FileText, Palette, Code2, CheckCircle2, Rocket, ShieldCheck } from 'lucide-react';
import { workflowStages } from '../data/agencyData';
import { ScrollReveal } from './ScrollReveal';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  FileText: FileText,
  Palette: Palette,
  Code2: Code2,
  CheckCircle2: CheckCircle2,
  Rocket: Rocket,
};

export const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#0A0F1D]/80 relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 px-4 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
            <span>Прозрачный процесс</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Как мы работаем над вашим сайтом
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Без предоплаты: делаем работу, показываем вам готовый результат, и только после согласования вы производите оплату.
          </p>
        </ScrollReveal>

        {/* Steps Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative mb-16">
          {workflowStages.map((stage, index) => {
            const IconComponent = iconMap[stage.icon] || Code2;
            return (
              <ScrollReveal key={stage.step} direction="up" delay={index * 0.08} className="h-full">
                <div
                  id={`workflow-step-${stage.step}`}
                  className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-5 sm:p-6 flex flex-col justify-between hover:border-blue-500 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 h-full"
                >
                  <div>
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white group-hover:bg-blue-700 transition-colors duration-300 shadow-sm shadow-blue-600/20">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
                        0{stage.step}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-black text-slate-950 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {stage.title}
                    </h3>

                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mb-3">
                      Срок: {stage.duration}
                    </span>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                      {stage.description}
                    </p>
                  </div>

                  {/* Deliverables Box */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 p-3">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block mb-1.5">
                      Что вы получаете:
                    </span>
                    <ul className="space-y-1">
                      {stage.deliverables.map((item, i) => (
                        <li key={i} className="text-[11px] text-slate-800 dark:text-slate-200 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="rounded-2xl sm:rounded-3xl border border-blue-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <ShieldCheck className="h-6 w-6 sm:h-9 sm:w-9" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  <span>100% БЕЗОПАСНОСТЬ ДЛЯ ЗАКАЗЧИКА</span>
                </div>
                <h4 className="font-display text-base sm:text-xl font-black text-white">
                  Разработка без предоплаты • Оплата только после вашей проверки
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Мы начинаем работу без аванса. Вы получаете готовый работающий проект, проверяете его со всех сторон, и только если всё полностью устраивает — переводите оплату.
                </p>
              </div>
            </div>
            <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
              <span className="flex-1 sm:flex-initial text-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs text-emerald-300 font-bold">
                0% Предоплаты
              </span>
              <span className="flex-1 sm:flex-initial text-center rounded-xl border border-white/20 bg-white/5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs text-slate-200 font-bold">
                Официальный договор
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

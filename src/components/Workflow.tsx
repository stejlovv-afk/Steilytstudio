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
    <section id="workflow" className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#0B101B]/80 relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-100/30 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-1 text-xs font-mono font-bold text-slate-800 dark:text-cyan-400 mb-4 shadow-xs">
            <span>[ ПРОЗРАЧНЫЙ ПРОЦЕСС ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Этапы работы над проектом
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Приступаем к разработке без предоплаты: присылаем вам итоговый вариант на согласование, и только после этого берем оплату.
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
                  className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-5 sm:p-6 flex flex-col justify-between hover:border-black dark:hover:border-[#00E5FF] transition-all duration-300 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(0,229,255,0.12)] h-full"
                >
                  <div>
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black dark:bg-slate-800 text-white dark:text-[#00E5FF] group-hover:bg-[#00B4D8] dark:group-hover:bg-[#00E5FF] group-hover:text-black transition-colors duration-300 border border-transparent dark:border-slate-700">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-black text-slate-950 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        0{stage.step}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-black text-slate-950 dark:text-white mb-1 group-hover:text-black dark:group-hover:text-[#00E5FF] transition-colors">
                      {stage.title}
                    </h3>

                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-semibold block mb-3">
                      Срок: {stage.duration}
                    </span>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                      {stage.description}
                    </p>
                  </div>

                  {/* Deliverables Box */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 p-3">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase block mb-1.5">
                      Результат:
                    </span>
                    <ul className="space-y-1">
                      {stage.deliverables.map((item, i) => (
                        <li key={i} className="text-[11px] text-slate-800 dark:text-slate-200 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-[#00B4D8] dark:text-[#00E5FF] shrink-0" />
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
          <div className="rounded-2xl sm:rounded-3xl border border-slate-800 dark:border-slate-700 bg-slate-950 dark:bg-[#0c121e] p-5 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#00E5FF] border border-white/10">
                <ShieldCheck className="h-6 w-6 sm:h-9 sm:w-9" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  <span>100% БЕЗОПАСНАЯ СДЕЛКА</span>
                </div>
                <h4 className="font-display text-base sm:text-xl font-black text-white">
                  Разработка без предоплаты • Оплата по факту готовности
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
                  Приступаем к работе сразу без аванса. Создаем и демонстрируем вам полностью готовый итоговый вариант продукта, и только после вашего утверждения вы производите оплату.
                </p>
              </div>
            </div>
            <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
              <span className="flex-1 sm:flex-initial text-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-mono text-emerald-300 font-bold">
                0% Предоплаты
              </span>
              <span className="flex-1 sm:flex-initial text-center rounded-xl border border-white/20 bg-white/5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-mono text-gray-200 font-bold">
                Договор & NDA
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

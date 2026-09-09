import React, { useState } from 'react';
import {
  FileText,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Milestone
} from 'lucide-react';
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
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStage = workflowStages.find((s) => s.step === activeStep) || workflowStages[0];
  const CurrentIcon = iconMap[currentStage.icon] || Code2;

  // Percentage progress based on active step (1 to 5)
  const progressPercent = ((activeStep - 1) / (workflowStages.length - 1)) * 100;

  const handleNextStep = () => {
    setActiveStep((prev) => (prev < workflowStages.length ? prev + 1 : prev));
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <section id="workflow" className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#0A0F1D]/80 relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Glow decorative gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-500/10 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
            <Milestone className="h-3.5 w-3.5 text-blue-500" />
            <span>Дорожная карта проекта</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Как идея превращается в работающий сайт
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Наглядный пошаговый маршрут от первого знакомства до запуска в интернет. 
            <span className="font-bold text-slate-900 dark:text-white"> Без предоплаты:</span> вы платите только после проверки готового результата на своем смартфоне.
          </p>
        </ScrollReveal>

        {/* ================================================================ */}
        {/* VISUAL TIMELINE ROADMAP (INTERACTIVE MILESTONE CONTROLLER)       */}
        {/* ================================================================ */}
        <ScrollReveal direction="up" delay={0.1} className="mb-12">
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/90 p-5 sm:p-8 md:p-10 shadow-xl shadow-blue-500/5 backdrop-blur-sm">
            
            {/* Timeline Header bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-0.5">
                  Интерактивный таймлайн
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <span>Этапы реализации</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-900/50">
                    Этап {activeStep} из 5
                  </span>
                </h3>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevStep}
                  disabled={activeStep === 1}
                  aria-label="Предыдущий этап"
                  className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-35 disabled:cursor-not-allowed transition-all text-xs font-semibold flex items-center gap-1.5"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Назад</span>
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={activeStep === workflowStages.length}
                  aria-label="Следующий этап"
                  className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-35 disabled:cursor-not-allowed transition-all text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <span className="hidden sm:inline">Далее</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Desktop / Tablet Horizontal Timeline Bar */}
            <div className="hidden lg:block my-8 px-4">
              <div className="relative">
                {/* Background Connecting Line */}
                <div className="absolute top-6 left-12 right-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                
                {/* Active Progress Connecting Line */}
                <div
                  className="absolute top-6 left-12 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `calc((100% - 6rem) * ${progressPercent / 100})` }}
                />

                {/* Milestone Nodes */}
                <div className="relative flex justify-between">
                  {workflowStages.map((stage) => {
                    const StageIcon = iconMap[stage.icon] || Code2;
                    const isActive = stage.step === activeStep;
                    const isPassed = stage.step < activeStep;

                    return (
                      <button
                        key={stage.step}
                        onClick={() => setActiveStep(stage.step)}
                        className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 focus:outline-none w-48"
                      >
                        {/* Node Bubble */}
                        <div
                          className={`relative flex h-13 w-13 items-center justify-center rounded-2xl transition-all duration-300 z-10 ${
                            isActive
                              ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/40 ring-4 ring-blue-500/20'
                              : isPassed
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                              : 'bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 group-hover:border-blue-400 group-hover:text-blue-500'
                          }`}
                        >
                          <StageIcon className="h-6 w-6 transition-transform group-hover:scale-110" />
                          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-bold border border-white/20">
                            {stage.step}
                          </span>
                        </div>

                        {/* Node Text Info */}
                        <div className="mt-3.5 space-y-0.5">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider block transition-colors ${
                              isActive
                                ? 'text-blue-600 dark:text-blue-400'
                                : isPassed
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {stage.duration}
                          </span>
                          <span
                            className={`text-xs font-bold transition-colors line-clamp-2 ${
                              isActive
                                ? 'text-slate-950 dark:text-white'
                                : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                            }`}
                          >
                            {stage.phase || stage.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Horizontal Scrollable Milestone Pills */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-4 scrollbar-none -mx-2 px-2">
              {workflowStages.map((stage) => {
                const StageIcon = iconMap[stage.icon] || Code2;
                const isActive = stage.step === activeStep;
                const isPassed = stage.step < activeStep;

                return (
                  <button
                    key={stage.step}
                    onClick={() => setActiveStep(stage.step)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25'
                        : isPassed
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-transparent'
                    }`}
                  >
                    <StageIcon className="h-3.5 w-3.5" />
                    <span>0{stage.step}. {stage.duration}</span>
                  </button>
                );
              })}
            </div>

            {/* ========================================================== */}
            {/* ACTIVE MILESTONE DETAIL SPOTLIGHT PANEL                   */}
            {/* ========================================================== */}
            <div className="mt-4 sm:mt-6 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100/60 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 border border-blue-200/80 dark:border-slate-800 p-5 sm:p-8 transition-all">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 shrink-0">
                    <CurrentIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
                        Этап 0{currentStage.step}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-blue-500" />
                        {currentStage.duration}
                      </span>
                      {currentStage.badge && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          {currentStage.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-lg sm:text-2xl font-black text-slate-950 dark:text-white">
                      {currentStage.title}
                    </h4>
                  </div>
                </div>

                {/* Quick Action Hint */}
                <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>Прозрачный контроль на каждом шаге</span>
                </div>
              </div>

              {/* Stage Description */}
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {currentStage.description}
              </p>

              {/* Roles Breakdown (Client vs Agency) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Agency Role */}
                <div className="rounded-xl border border-blue-200/80 dark:border-blue-900/40 bg-white/90 dark:bg-slate-900/80 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1.5">
                    <Code2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Что делает Steilyt Studio:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {currentStage.agencyRole || 'Берем всю техническую сложность на себя.'}
                  </p>
                </div>

                {/* Client Role */}
                <div className="rounded-xl border border-emerald-200/80 dark:border-emerald-900/40 bg-white/90 dark:bg-slate-900/80 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-1.5">
                    <UserCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Что требуется от вас:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {currentStage.clientRole || 'Минимум времени: только согласование готового решения.'}
                  </p>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
                  Результаты и артефакты этого этапа:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentStage.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>

        {/* ================================================================ */}
        {/* ALL STAGES GRID VIEW (CARDS WITH ACTIVE HIGHLIGHT)               */}
        {/* ================================================================ */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
              Все 5 этапов в деталях
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Нажмите на любую карточку, чтобы открыть её на интерактивной дорожной карте
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative mb-16">
          {workflowStages.map((stage, index) => {
            const IconComponent = iconMap[stage.icon] || Code2;
            const isSelected = stage.step === activeStep;

            return (
              <ScrollReveal key={stage.step} direction="up" delay={index * 0.07} className="h-full">
                <div
                  id={`workflow-step-${stage.step}`}
                  onClick={() => setActiveStep(stage.step)}
                  className={`group relative rounded-2xl sm:rounded-3xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer h-full ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-500/50 bg-blue-50/30 dark:bg-slate-900 shadow-blue-500/10 scale-[1.02]'
                      : 'border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 hover:border-blue-400'
                  }`}
                >
                  <div>
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors duration-300 shadow-sm ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-blue-600/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                          isSelected
                            ? 'text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-950/70 border-blue-300 dark:border-blue-800'
                            : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        0{stage.step}
                      </span>
                    </div>

                    <h3
                      className={`font-display text-base font-black mb-1 transition-colors ${
                        isSelected
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}
                    >
                      {stage.title}
                    </h3>

                    <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold block mb-3">
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
                      {stage.deliverables.slice(0, 2).map((item, i) => (
                        <li key={i} className="text-[11px] text-slate-800 dark:text-slate-200 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow Indicator for flow */}
                  {index < workflowStages.length - 1 && (
                    <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-slate-400">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  )}

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

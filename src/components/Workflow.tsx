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
import { localizedData } from '../data/localizedData';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  FileText: FileText,
  Palette: Palette,
  Code2: Code2,
  CheckCircle2: CheckCircle2,
  Rocket: Rocket,
};

interface WorkflowProps {
  onOpenWarranty?: () => void;
}

export const Workflow: React.FC<WorkflowProps> = ({ onOpenWarranty }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const { language, t } = useLanguage();

  const workflowList = localizedData[language].workflow;
  const currentStage = workflowList.find((s) => s.step === activeStep) || workflowList[0];
  const CurrentIcon = iconMap[currentStage.icon] || Code2;

  // Percentage progress based on active step (1 to 5)
  const progressPercent = ((activeStep - 1) / (workflowList.length - 1)) * 100;

  const handleNextStep = () => {
    setActiveStep((prev) => (prev < workflowList.length ? prev + 1 : prev));
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
            <span>{t.workflow.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            {t.workflow.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.workflow.subtitle}
          </p>
        </ScrollReveal>

        {/* Step Selector Pills (Interactive Tab Bar) */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* Progress bar line */}
          <div className="relative mb-6 hidden sm:block">
            <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
            {workflowList.map((st) => {
              const isActive = activeStep === st.step;
              const isPassed = activeStep > st.step;
              return (
                <button
                  key={st.step}
                  onClick={() => setActiveStep(st.step)}
                  className={`flex flex-col items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl border text-center transition-all active:scale-95 ${
                    isActive
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : isPassed
                      ? 'border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isActive ? 'text-blue-100' : ''}`}>
                    {t.workflow.stepPrefix} {st.step}
                  </span>
                  <span className={`text-[11px] sm:text-xs font-semibold truncate w-full mt-0.5 hidden sm:block ${isActive ? 'text-white' : ''}`}>
                    {st.phase || st.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Card */}
        <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-5 sm:p-10 shadow-lg relative overflow-hidden transition-all duration-300">
          
          {/* Top Bar inside Card */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
                <CurrentIcon className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  {currentStage.badge || `${t.workflow.stepPrefix} ${currentStage.step}`}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                  {currentStage.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>{currentStage.duration}</span>
            </div>
          </div>

          {/* Body Description */}
          <div className="py-6">
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              {currentStage.description}
            </p>

            {/* Deliverables List */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider block mb-3">
                {t.workflow.resultsLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {currentStage.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs font-medium text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Roles Matrix: Client vs Agency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-200 mb-1">
                  <UserCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>{t.workflow.clientRoleLabel}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {currentStage.clientRole}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                  <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.workflow.agencyRoleLabel}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {currentStage.agencyRole}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls inside card */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrevStep}
              disabled={activeStep === 1}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[40px] ${
                activeStep === 1
                  ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
                  : 'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 active:scale-95'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{t.workflow.prevBtn}</span>
            </button>

            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {activeStep} / {workflowList.length}
            </span>

            {activeStep < workflowList.length ? (
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm active:scale-95 transition-all min-h-[40px]"
              >
                <span>{t.workflow.nextBtn}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <a
                href="#calculator"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm active:scale-95 transition-all min-h-[40px]"
              >
                <span>{t.workflow.getEstimateBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
